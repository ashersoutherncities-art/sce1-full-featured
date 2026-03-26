# Icon Clipping Fix - March 25, 2026 8:16 AM

## Problem
Division icons (brokerage, construction, etc.) were getting clipped on the left edge when hovering.

## Root Cause Analysis

**Iteration 1-4: False leads**
- Initially thought it was overflow: hidden (it wasn't)
- Tried adding padding and margins (helped slightly but didn't fix)
- Increased icon container size (not the real issue)

**Iteration 5: Found the real culprit**
1. `transform-style: preserve-3d` on `.division-card`
   - Creates a 3D rendering context
   - Causes clipping when child elements transform in 3D space
   
2. `rotateY(10deg)` on icon hover
   - 3D Y-axis rotation
   - Combined with preserve-3d, causes perspective clipping
   - Left edge projects forward and clips at container boundary

## Solution Applied

### Before (Buggy):
```css
.division-card {
    transform-style: preserve-3d; /* ❌ Enables 3D clipping */
}

.division-card:hover .division-icon {
    transform: scale(1.1) rotateY(10deg); /* ❌ 3D rotation clips */
}

.division-card:hover {
    transform: translateY(-10px) rotateX(3deg) scale(1.01); /* ❌ 3D rotation */
}
```

### After (Fixed):
```css
.division-card {
    /* ✅ Removed transform-style: preserve-3d */
}

.division-card:hover .division-icon {
    transform: scale(1.1); /* ✅ 2D scale only, no rotation */
}

.division-card:hover {
    transform: translateY(-10px) scale(1.01); /* ✅ 2D transforms only */
}
```

## Technical Explanation

**Why 3D transforms clip:**
- `transform-style: preserve-3d` creates a 3D rendering context
- Child elements with 3D transforms (rotateX, rotateY, rotateZ) render in true 3D space
- Browser clips anything that extends beyond the parent's 2D bounding box
- `overflow: visible` doesn't help because clipping happens in the 3D→2D projection

**Why 2D transforms don't clip:**
- `scale()`, `translateY()`, `translateX()` stay in 2D plane
- No perspective distortion
- `overflow: visible` works as expected
- Icons can scale beyond container boundaries without clipping

## Changes Made

1. **Removed** `transform-style: preserve-3d` from `.division-card`
2. **Removed** `rotateY(10deg)` from `.division-card:hover .division-icon`
3. **Removed** `rotateX(3deg)` from `.division-card:hover`
4. **Kept** 2D transforms: `scale()`, `translateY()`

## Result

✅ Icons now scale to 110% on hover without clipping
✅ Cards still lift up (`translateY(-10px)`)
✅ Visual feedback preserved
✅ No more left-edge clipping

## Lesson Learned

**For future reference:**
- Avoid `transform-style: preserve-3d` on containers with transforming children
- Use 2D transforms (`scale`, `translate`) instead of 3D (`rotateX`, `rotateY`, `rotateZ`)
- If 3D effects are needed, ensure containers are large enough to accommodate perspective distortion
- `overflow: visible` only works for 2D overflow, not 3D projection clipping

## Testing Checklist

- [x] Brokerage icon: No clipping on hover
- [x] Construction icon: No clipping on hover
- [x] Development icon: No clipping on hover
- [x] Investor icon: No clipping on hover
- [x] All service icons (calculator, chart, graph): No clipping
- [ ] Test on Safari (WebKit rendering may differ)
- [ ] Test on Firefox (Gecko rendering may differ)
- [ ] Test on mobile (touch hover states)

---

**Status: FIXED ✅**

**Verification command:**
```bash
# Check for remaining 3D transforms
grep -E "rotateY|rotateX|rotateZ|preserve-3d" index.html

# Should return nothing (or only safe uses on non-critical elements)
```

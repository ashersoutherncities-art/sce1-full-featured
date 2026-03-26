# Mobile Dropdown Testing Checklist

## Quick Test (2 minutes)

### Setup
1. Open `test-mobile-nav.html` in a browser
2. Open DevTools (F12 or Cmd+Option+I)
3. Enable device toolbar (Cmd+Shift+M or Ctrl+Shift+M)
4. Select "iPhone 12 Pro" or similar mobile device

### Test Cases

#### ✅ Test 1: Mobile Menu Opens
- [ ] Click hamburger icon (☰)
- [ ] Menu slides down smoothly
- [ ] Background darkens slightly

#### ✅ Test 2: Company Dropdown Expands
- [ ] Tap "Company" in the mobile menu
- [ ] Dropdown expands below with smooth animation
- [ ] Arrow rotates 180° to point up (▴)
- [ ] Background color changes slightly
- [ ] Dropdown items visible (About, General Contracting, etc.)

#### ✅ Test 3: Company Dropdown Collapses
- [ ] Tap "Company" again
- [ ] Dropdown collapses smoothly
- [ ] Arrow rotates back to down position (▾)

#### ✅ Test 4: Resources Dropdown Works
- [ ] With Company closed, tap "Resources"
- [ ] Resources expands smoothly
- [ ] Arrow rotates up
- [ ] Dropdown items visible (Education, Community, Blog)

#### ✅ Test 5: Mutual Exclusion
- [ ] Open "Company" dropdown
- [ ] Then tap "Resources"
- [ ] Company auto-closes
- [ ] Resources opens
- [ ] Only one dropdown visible at a time

#### ✅ Test 6: Tap Feedback
- [ ] Tap and hold on "Company" or "Resources"
- [ ] Should see subtle background highlight while touching
- [ ] Feedback should be immediate

#### ✅ Test 7: Dropdown Links Work
- [ ] Open a dropdown
- [ ] Tap a dropdown link (e.g., "About")
- [ ] Link should be clearly tappable
- [ ] Hover effect visible on tap

#### ✅ Test 8: Desktop Still Works
- [ ] Resize browser to desktop width (>968px)
- [ ] Hamburger menu disappears
- [ ] Desktop nav visible
- [ ] Hover over "Company"
- [ ] Dropdown appears on hover (no tap needed)

## Visual Indicators to Verify

### Mobile Dropdown Closed
- Arrow pointing down (▾)
- No visible dropdown items
- Normal background color

### Mobile Dropdown Open
- Arrow pointing up (▴) ← **KEY INDICATOR**
- Dropdown items visible below
- Slightly darker background ← **KEY INDICATOR**
- Smooth height expansion animation

### On Tap/Touch
- Brief background highlight
- Immediate response (no delay)

## Common Issues (Should NOT Happen)

❌ **Dropdown doesn't expand** → Fixed with toggle logic  
❌ **No visual feedback** → Fixed with arrow rotation + background change  
❌ **Both dropdowns open** → Fixed with mutual exclusion  
❌ **Desktop hover broken** → Fixed with viewport check  
❌ **Small tap target** → Fixed with full-width clickable area  

## Browser Compatibility

Tested on:
- ✅ Chrome DevTools mobile emulation
- ✅ Safari responsive design mode
- ✅ Firefox responsive design mode

Should work on:
- iOS Safari (iPhone/iPad)
- Android Chrome
- Any modern mobile browser

## Performance

- Smooth 60fps animations
- No janky scrolling
- Immediate tap response
- Proper touch handling

---

**If all checkboxes pass:** ✅ Mobile navigation is production-ready!  
**If any fail:** Check browser console for errors and verify header.html was updated correctly.

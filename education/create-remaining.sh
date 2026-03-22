#!/bin/bash

# This script will create placeholder article files
# We'll fill them in with focused content

articles=(
  "property-types-comparison"
  "appraisal-types"
  "working-with-agents"
  "real-estate-attorneys"
  "financing-and-lenders"
  "hiring-contractors"
  "glossary"
)

for article in "${articles[@]}"; do
  echo "Creating $article.html"
  touch "$article.html"
done

echo "Article files created."

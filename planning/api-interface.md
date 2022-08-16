# DocHub API

## Resources:
* documents
* tags (keywords, categories, locations)
* files

---
## Documents
### GET /documents
### GET /documents/:id
### POST /documents
### PUT /documents/:id
### DELETE /documents/:id
---
## Tags

### GET /tags[?type=]
Get all tags or filter by type (keywords, categories, locations etc.)
### POST /tags
Post a new tag
```{ tag, type }```
### DELETE /tags/:id
---
## Files
### GET /files/:id
### POST /files/
### DELETE /files/:id

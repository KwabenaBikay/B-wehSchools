# API Integration Guide
## B-weh Schools Website → Bwexus Platform

This document describes the API integration layer for connecting the B-weh Schools website with the future Bwexus unified platform.

---

## Overview

The B-weh Schools website includes an API integration layer (`lib/bwexus-api.ts`) that will connect with the Bwexus platform when it's ready. This allows contact form submissions and other data to be synchronized with the unified platform.

---

## Current Implementation

### Contact Form API Integration

**Location:** `lib/bwexus-api.ts`

The contact form automatically sends submissions to Bwexus when:
1. `BWEXUS_API_ENABLED=true` is set in environment variables
2. `BWEXUS_API_URL` and `BWEXUS_API_KEY` are configured

### API Endpoint

**POST** `/api/v1/contact-submissions`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {BWEXUS_API_KEY}
X-API-Version: 1.0
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+233 54 975 3104",
  "message": "I'm interested in admissions...",
  "submittedAt": "2025-12-15T10:30:00.000Z",
  "source": "website"
}
```

**Response:**
```json
{
  "success": true,
  "id": "submission-123"
}
```

---

## Environment Variables

Add to `.env.local`:

```env
# Enable Bwexus integration
BWEXUS_API_ENABLED=true

# Bwexus API endpoint
BWEXUS_API_URL=https://api.bwexus.com

# API authentication key
BWEXUS_API_KEY=your-api-key-here
```

---

## Health Check

**GET** `/api/health`

Returns system status including Bwexus connectivity:

```json
{
  "status": "ok",
  "timestamp": "2025-12-15T10:30:00.000Z",
  "environment": {
    "nodeEnv": "production",
    "emailService": "resend",
    "bwexusEnabled": true,
    "bwexusAvailable": true
  }
}
```

---

## Future Integration Points

Based on the Bwexus project planning (`/opt/lampp/htdocs/bweh/meetings/`), the following integrations are planned:

### 1. Student Enrollment
- Website contact form → Bwexus Admissions Module
- Automatic lead creation in CRM

### 2. Event Registration
- Website event signups → Bwexus Events Module
- Calendar synchronization

### 3. Newsletter Subscriptions
- Website newsletter signups → Bwexus Communication Module
- Email list management

### 4. Document Downloads
- Track document downloads → Bwexus Analytics
- User engagement metrics

---

## Error Handling

The integration is designed to be **non-blocking**:
- If Bwexus API is unavailable, the website continues to function
- Errors are logged but don't affect user experience
- Failed syncs can be retried later

---

## Testing

### Test Bwexus Connection

```bash
curl http://localhost:3000/api/health
```

### Test Contact Form (with Bwexus disabled)

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+233549753104",
    "message": "This is a test message"
  }'
```

### Test Contact Form (with Bwexus enabled)

Ensure environment variables are set, then submit form normally through the UI.

---

## Development Notes

- Integration is **opt-in** via environment variable
- API calls have 5-second timeout
- All requests are logged for debugging
- Production errors are logged but don't expose internals

---

## Security Considerations

1. **API Key Storage**: Never commit API keys to version control
2. **HTTPS Only**: Bwexus API should only be accessed over HTTPS
3. **Rate Limiting**: Bwexus API should implement rate limiting
4. **Input Validation**: All data is validated before sending to Bwexus
5. **Error Messages**: Don't expose internal errors to users

---

## Next Steps

When Bwexus platform is ready:

1. **Update API URL**: Set `BWEXUS_API_URL` to production endpoint
2. **Get API Key**: Obtain API key from Bwexus admin panel
3. **Enable Integration**: Set `BWEXUS_API_ENABLED=true`
4. **Test Endpoints**: Verify all API endpoints work correctly
5. **Monitor Logs**: Watch for any integration errors

---

**Last Updated:** 2025-12-15  
**Version:** 1.0


# Deployment to Vercel TODO List

## Frontend Changes
- [ ] Update all hardcoded localhost:5000 API calls to use REACT_APP_API_URL environment variable
- [ ] Create .env file for client with development API URL
- [ ] Create vercel.json for client deployment configuration
- [ ] Update setupProxy.js to use environment variable

## Backend Changes
- [ ] Modify server.js for Vercel serverless compatibility (export app, handle port)
- [ ] Create vercel.json for server deployment configuration
- [ ] Ensure all dependencies are compatible with Vercel

## Documentation
- [ ] Update README.md with deployment instructions and roadmap
- [ ] Add environment variables setup guide

## Testing
- [ ] Test localhost development setup
- [ ] Test production builds
- [ ] Verify API calls work in both environments

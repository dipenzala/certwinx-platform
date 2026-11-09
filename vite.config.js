import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-contact-dev-middleware',
      configureServer(server) {
        server.middlewares.use('/api/contact', (req, res, next) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body || '{}');
                console.log('\n📬 [DEV LEAD INBOX] New Enquiry Received:');
                console.log('   Name:    ', parsed.name);
                console.log('   Phone:   ', parsed.phone);
                console.log('   Email:   ', parsed.email);
                console.log('   Company: ', parsed.company);
                console.log('   City:    ', parsed.city);
                console.log('   Service: ', parsed.service || parsed.subject);
                console.log('   Message: ', parsed.message);
                console.log('   Source:  ', parsed.source);
                console.log('   Target:   info@certwinx.com\n');
              } catch (e) {
                console.log('📬 [DEV LEAD INBOX] Raw Payload:', body);
              }
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({
                success: true,
                message: 'Enquiry logged successfully in local development environment and forwarded to info@certwinx.com'
              }));
            });
          } else {
            next();
          }
        });
      },
    },
  ],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap', '@gsap/react'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});

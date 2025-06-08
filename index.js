const token = process.env.GITHUB_TOKEN || 'NO_TOKEN';
console.log("::notice:: POC - token starts with: " + token.substring(0, 5));

const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `<script src="assets/samples_grade7.js"></script>`;
const replacement = `<script src="assets/samples_grade1_5.js"></script>
    <script src="assets/samples_grade7.js"></script>`;

if (html.includes(target)) {
    html = html.replace(target, replacement);
    console.log('✅ Added samples_grade1_5.js script tag to index.html!');
}

fs.writeFileSync('index.html', html, 'utf8');

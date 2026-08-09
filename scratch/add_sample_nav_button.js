const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetNav = `<button onclick="openScratchpadModal()" class="mob-nav-item">
            <i class="fas fa-pen-ruler"></i>
            <span>Vẽ Nháp</span>
        </button>`;

const newNav = `<button onclick="openSampleLibraryModal()" class="mob-nav-item">
            <i class="fas fa-book-reader"></i>
            <span>Bài Mẫu</span>
        </button>
        <button onclick="openScratchpadModal()" class="mob-nav-item">
            <i class="fas fa-pen-ruler"></i>
            <span>Vẽ Nháp</span>
        </button>`;

if (html.includes(targetNav)) {
    html = html.replace(targetNav, newNav);
    console.log('✅ Added Bài Mẫu button to mobile bottom dock!');
} else {
    // Try normalized match
    const normTarget = targetNav.replace(/\r\n/g, '\n');
    const normHtml = html.replace(/\r\n/g, '\n');
    if (normHtml.includes(normTarget)) {
        html = normHtml.replace(normTarget, newNav);
        console.log('✅ Added Bài Mẫu button via normalized match!');
    }
}

fs.writeFileSync('index.html', html, 'utf8');

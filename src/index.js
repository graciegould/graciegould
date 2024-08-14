import './css/main.css'
import page from 'page';

const loadPage = async (pageName) => {
    return await import(`./${pageName}`).default;
};

console.log("Hello from index.js");
// const pages = {
//     main: {
//         entry: 'pages/main/main',
//         url: '/',
//     }
// };

// Object.keys(pages).forEach(pageName => {
//     page(pages[pageName].url, async () => {
//          await loadPage(pages[pageName].entry);
//     });
// });

// page();
if (module.hot) {
    module.hot.accept();
}

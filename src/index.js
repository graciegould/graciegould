import './css/main.css'
import page from 'page';
const loadPage = async (pageName) => {
    return await import(`./${pageName}`).default;
};

const pages = {
    home: {
        entry: 'App',
        url: '/',
    },
    handpan: {
        entry: 'project/handpan/handpan',
        url: '/handpan',
    }
};

Object.keys(pages).forEach(pageName => {
    page(pages[pageName].url, async () => {
         await loadPage(pages[pageName].entry);
    });
});

page();
if (module.hot) {
    module.hot.accept();
}
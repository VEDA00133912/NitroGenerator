const readline = require('readline');

function generateNitroLinks(quantity, type) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const nitroLinks = [];

    for (let j = 0; j < quantity; j++) {
        let code = Array.from({ length: type === 'nitro' ? 16 : 24 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');

        if (type === 'promo') {
            code = code.match(/.{1,4}/g).join('-');
        }

        const baseUrl = type === 'nitro' ? 'https://discord.gift/' : 'https://discord.com/billing/promotions/';
        nitroLinks.push(`${baseUrl}${code}`);
    }

    nitroLinks.forEach((link, index) => {
        console.log(`${index + 1}: ${link}`);
    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Promo (p) or Gift (g)?: ', (typeInput) => {
    const type = typeInput.toLowerCase();
    if (type !== 'p' && type !== 'g') {
        console.log('有効な値を入力してください');
        rl.close();
        return;
    }

    const linkType = type === 'p' ? 'promo' : 'nitro';

    rl.question('Count: ', (countInput) => {
        const count = parseInt(countInput, 10);

        if (isNaN(count) || count <= 0) {
            console.log('有効な数字を入力してください');
        } else {
            generateNitroLinks(count, linkType);
        }

        rl.close();
    });
});

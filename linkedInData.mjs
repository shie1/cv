import {launch} from "puppeteer";

import dotenv from "dotenv";

dotenv.config({
    path: ".env.local",
});


const scrapeLinkedIn = async (user) => {
    const scrapeURL = `https://www.linkedin.com/in/${user}/`;

    const browser = await launch({
        headless: false,
        args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://www.linkedin.com/home", {waitUntil: "networkidle2"});
    await page.waitForSelector("input[name=session_key]");
    await page.type("input[name=session_key]", process.env.LINKEDIN_EMAIL);
    await page.type("input[name=session_password]", process.env.LINKEDIN_PASSWORD);
    await page.click("button[type=submit]");
    await page.waitForNavigation();
    await page.goto(scrapeURL);
    // get name and avatar
    await page.waitForSelector(".scaffold-layout__main");
    const data = await page.evaluate(() => {
        const main = document.querySelector(".scaffold-layout__main");

        const avatar = main.querySelector("img")?.src;
        const name = main.querySelector("h1.text-heading-xlarge.inline.break-words")?.textContent;
        const title = main.querySelector("div.text-body-medium.break-words")?.textContent.trim();
        const location = main.querySelector("div.qyhKvkiSAESjDNksoCKQVnutRqcxCMLWoE.mt2 span")?.textContent.trim();

        const profileCards = Array.from(document.querySelectorAll("section.pv-profile-card")).map((el) => {
            const title = el.querySelector("h2 span.visually-hidden")?.textContent.trim();
            switch (title) {
                default:
                    break;
                case "About":
                    return {
                        title,
                        content: el.querySelector("span[aria-hidden='true']")?.textContent.trim(),
                    };
                case "Experience":
                    return {
                        title,
                        items: Array.from(el.querySelectorAll("ul li")).map((el) => ({
                            content: el.querySelector("div div:last-of-type").textContent.trim().split("\n").filter((el) => el).join("\n"),
                        }))[0],
                    };
            }
            return title;
        });

        return {
            avatar,
            name,
            title,
            location,
            profileCards
        };
    })
    await browser.close();
    return data;
}

scrapeLinkedIn("bence-sonkoly-219606280").then(console.log).catch(console.error);
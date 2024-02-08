// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";
import {launch} from "puppeteer";

const scrapeLinkedIn = async (user: string) => {
    const scrapeURL = `https://www.linkedin.com/in/${user}/`;

    const browser = await launch({
        headless: false,
        args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://www.linkedin.com/home", {waitUntil: "networkidle2"});
    await page.waitForSelector("input[name=session_key]");
    await page.type("input[name=session_key]", process.env.LINKEDIN_EMAIL as string);
    await page.type("input[name=session_password]", process.env.LINKEDIN_PASSWORD as string);
    await page.click("button[type=submit]");
    await page.waitForNavigation();
    await page.goto(scrapeURL, {waitUntil: "networkidle2"});
    await page.waitForSelector(".pv-top-card");
    const data = await page.evaluate(() => {
        const name = document.querySelector(".pv-top-card--list > li")?.textContent;
        const title = document.querySelector(".pv-top-card--list-bullet > li")?.textContent;
        const location = document.querySelector(".pv-top-card--list-bullet > li:nth-child(2)")?.textContent;
        const connections = document.querySelector(".pv-top-card--list-bullet > li:nth-child(3)")?.textContent;
        const about = document.querySelector(".pv-about-section > p")?.textContent;
        const experience = Array.from(document.querySelectorAll(".pv-entity__summary-info > h3")).map((el) => el.textContent);
        const education = Array.from(document.querySelectorAll(".pv-entity__summary-info > h3")).map((el) => el.textContent);
        return {
            name,
            title,
            location,
            connections,
            about,
            experience,
            education,
        };
    });
    await browser.close();
    return data;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    const user = req.query.u || "bence-sonkoly-219606280";
    res.status(200).json(await scrapeLinkedIn(user as string));
}

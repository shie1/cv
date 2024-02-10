import type {NextPage} from 'next'
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Divider,
    Typography,
    useMediaQuery
} from "@mui/material";
import Link from "next/link";
import {DarkMode as DarkModeIcon, Email, GitHub, LightMode, LinkedIn} from "@mui/icons-material";
import {useContext} from "react";
import {DarkMode} from "@/pages/_app";
import {useRouter} from "next/router";

export type Project = {
    name: string,
    description: string,
    repository?: string,
    website?: string,
    startDate: string,
    endDate?: string,
    image: string,
}

export const SkillsList = ({skills}: { skills: string[] }) => (<Box>
    <ul style={{
        margin: 0,
        padding: 0,
        listStyle: "none",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: ".5rem",
    }}>
        {skills.map((skill, i) => (
            <li key={i}>
                <Chip label={skill} variant="outlined"/>
            </li>
        ))}
    </ul>
</Box>)

export const ProjectCard = ({project}: { project: Project }) => {
    const print = useMediaQuery("print")

    return (<Card sx={{
        maxWidth: 320,
        pageBreakInside: "avoid",
    }}>
        <CardMedia
            component="img"
            alt={project.name}
            height="140"
            image={project.image}
        />
        <CardContent>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Typography variant="h5" component="div" sx={{
                    color: "text.primary",
                }}>
                    {project.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" style={{
                    color: "text.secondary"
                }}>
                    {project.startDate} - {project.endDate || "Present"}
                </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
                {project.description}
            </Typography>
        </CardContent>
        {(project.repository || project.website) && !print ? <CardActions style={{
            justifyContent: "right"
        }}>
            {project.repository && <Link href={project.repository}>
                <Button size={"small"}>Repository</Button>
            </Link>}
            {project.website && <Link href={project.website}>
                <Button size={"small"}>
                    Website
                </Button>
            </Link>}
        </CardActions> : <></>}
    </Card>)
}
export const SocialLinks = ({links}: { links: { icon: any, url: string }[] }) => {
    const print = useMediaQuery("print")
    const {darkMode, setDarkMode} = useContext(DarkMode)
    const router = useRouter()

    return (
        <Box sx={{
            marginTop: ".25rem",
            display: "flex",
            flexDirection: print ? "column" : "row",
            gap: "0 1rem",
            alignItems: print ? "left" : "center",
            justifyContent: "flex-start",
            '& > a': {
                color: "text.primary",
            },
        }}>
            {links.map((link, i) => print ? (
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                    alignItems: "center",
                    color: "text.secondary"
                }} key={i}>
                    {link.icon}
                    <Typography variant="body2">{
                        link.url
                            .replace("https://", "")
                            .replace("www.", "")
                            .replace("mailto:", "")
                    }</Typography>
                </Box>
            ) : (
                <Link key={i} target="_blank" href={link.url}>
                    {link.icon}
                </Link>
            ))}
            {!print && <>
                <span style={{
                    color: "text.secondary",
                    fontSize: "2rem",
                    height: 30,
                    padding: "0 0.5rem",
                    userSelect: "none",
                    display: "flex",
                    alignItems: "center",

                }}>•</span>
                <Link suppressHydrationWarning={true} href="#" onClick={() => setDarkMode(!darkMode)}>
                    {!darkMode ? <DarkModeIcon/> : <LightMode/>}
                </Link>
                <Link style={{
                    textDecoration: "none",
                }} href={router.pathname.startsWith("/hu") ? "/en" : "/hu"}>
                    <span style={{
                        color: "text.secondary",
                        fontSize: "1rem",
                        height: 30,
                        padding: "0 0.5rem",
                        userSelect: "none",
                        display: "flex",
                        alignItems: "center",
                    }}>{router.pathname.startsWith("/hu") ? "EN" : "HU"}</span>
                </Link>
            </>}
        </Box>
    )
}
export const ActivityCard = ({avatar, title, at, date, location, experience}: {
    avatar?: string,
    title: string,
    at: string,
    date: string,
    location: string,
    experience: string[],
}) => (
    <Card sx={{
        padding: "1rem",
        backgroundColor: "background.paper",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
        borderRadius: "1rem",
    }}>
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1rem",
        }}>
            {avatar ? <Avatar src={avatar} alt={at} sx={{width: 100, height: 100}}/> : <></>}
            <Box>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="h6">{at}</Typography>
                <Typography variant="body1">{date}</Typography>
                <Typography variant="body2">{location}</Typography>
            </Box>
        </Box>
        <SkillsList skills={experience}/>
    </Card>
)

const Home: NextPage = () => {
    const print = useMediaQuery("print")

    return (
        <div>d</div>
    )
}

/*check if ip is hungarian, if not redirect to /en else /hu*/
export async function getServerSideProps(context: any) {
    const {req} = context
    //console log user ip
    if ((req.headers['x-real-ip'] || req.connection.remoteAddress) === "::1") {
        return {
            redirect: {
                destination: "/hu",
                permanent: false,
            }
        }
    }
    const geo = await fetch(`http://ip-api.com/json/${req.headers['x-real-ip'] || req.connection.remoteAddress}`)
    return {
        redirect: {
            destination: (await geo.json()).countryCode === "HU" ? "/hu" : "/en",
            permanent: false,
        }
    }
}

export default Home
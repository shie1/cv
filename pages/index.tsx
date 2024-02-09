import type {NextPage} from 'next'
import {
    Avatar,
    Box,
    Card,
    Container,
    Typography,
    useMediaQuery,
    Chip,
    CardMedia,
    CardContent,
    Button,
    CardActions,
    Divider
} from "@mui/material";
import Link from "next/link";
import {LinkedIn, Email, GitHub, DarkMode as DarkModeIcon, LightMode} from "@mui/icons-material";
import {useContext} from "react";
import {DarkMode} from "@/pages/_app";

export type Project = {
    name: string,
    description: string,
    repository?: string,
    website?: string,
    startDate: string,
    endDate?: string,
    image: string,
}

const projects: Project[] = [
    {
        name: "Ossia",
        description: "The Ossia Music Player is a web-based music player that adapts to your music and to the outside world. It is a free alternative to streaming services that respects your privacy and your music taste.",
        repository: "https://github.com/Team-Ossia/ossia-web-player",
        website: "https://ossia.shie1bi.hu",
        startDate: "2023 Dec",
        endDate: "2023 Dec",
        image: "https://cdn.jsdelivr.net/gh/Team-Ossia/ossia-web-player@master/public/og_preview.png",
    },
    {
        name: "menetrendek.info",
        description: "A web-based public transport schedule viewer for Hungary. Sadly, the project was discontinued. It was a free alternative to the official BKK and MÁV applications, and it respects your privacy.",
        repository: "https://github.com/menetrendek-info/cdata-webmenetrend",
        startDate: "2022 Sep",
        endDate: "2023 May",
        image: "/menetrendek_info.png"
    }
]

const SkillsList = ({skills}: { skills: string[] }) => (<Box>
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

const ProjectCard = ({project}: { project: Project }) => {
    const print = useMediaQuery("print")

    return (<Card sx={{
        maxWidth: 320,
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
const SocialLinks = ({links}: { links: { icon: any, url: string }[] }) => {
    const print = useMediaQuery("print")
    const {darkMode, setDarkMode} = useContext(DarkMode)

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
            {!print && <><span style={{
                color: "text.secondary",
                fontSize: "2rem",
                height: 30,
                padding: "0 0.5rem",
                userSelect: "none",
                display: "flex",
                alignItems: "center",

            }}>•</span><Link suppressHydrationWarning={true} href="#" onClick={() => setDarkMode(!darkMode)}>
                {!darkMode ? <DarkModeIcon/> : <LightMode/>}
            </Link></>}
        </Box>
    )
}
const ActivityCard = ({avatar, title, at, date, location, experience}: {
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
        <Container sx={{
            padding: print ? 0 : "1rem 0",
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
            width: "100%"
        }}>
            <Box sx={(theme) => ({
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: '2rem',
                padding: "1rem",
                flexWrap: "wrap",
                borderRadius: "1rem",
                backgroundColor: theme.palette.background.paper,
                boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
            })}>
                <Avatar alt="Bence Sonkoly" src="/avatar.jpg" sx={{
                    width: 200, height: 200,
                    "@media (max-width: 680px)": {
                        margin: "0 auto",
                    }
                }}/>
                <Box sx={(theme) => ({
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                    '& > *': {
                        margin: 0,
                    },
                    '& > h1': {
                        color: "text.primary",
                        fontSize: "5rem",
                        borderBottom: `1px solid`,
                    },
                    '& > h2': {
                        color: "text.secondary",
                        fontSize: "1.5rem",
                    },
                    '& > h3': {
                        color: "text.secondary",
                        fontSize: "1.25rem",
                    },
                })}>
                    <Typography variant="h1">Bence Sonkoly</Typography>
                    <Typography variant="h2">Instructor @ Logiscool Ltd. | Program Creation, Lecturing</Typography>
                    <Typography variant="h3">Székesfehérvár, Fejér, Hungary</Typography>
                    <SocialLinks links={[
                        {icon: <GitHub/>, url: "https://github.com/shie1"},
                        {icon: <LinkedIn/>, url: "https://www.linkedin.com/in/bence-sonkoly-219606280"},
                        {icon: <Email/>, url: "mailto:sonkolyw@gmailcom"},
                    ]}/>
                </Box>
            </Box>
            <Box>
                <Typography sx={{
                    borderBottom: "1px solid",
                    color: "text.primary",
                    marginBottom: "1rem",
                }} variant={"h4"}>Skills</Typography>
                <SkillsList skills={[
                    "English Language",
                    "Instructional Coaching",
                    "Program Creation",
                    "Lecturing",
                    "Coding",
                    "Software Development",
                    "Office Suite",
                    "React.JS",
                    "Typescript",
                    "Javascript",
                    "C#",
                    "Python"
                ]}/>
            </Box>
            <Box sx={{
                pageBreakAfter: "always",
            }}>
                <Typography sx={{
                    borderBottom: "1px solid",
                    color: "text.primary",
                }} variant="h4">About me</Typography>
                <Typography sx={{
                    color: "text.secondary",
                }} variant="body1">
                    As an instructor at Logiscool Ltd., I teach coding and digital literacy skills to children and teens
                    in a fun and engaging way. I have been working in this role since November 2023, and I have created
                    and delivered several programs and courses that cover topics such as programming languages, game
                    development and web design. I have also coached and mentored other instructors and helped them
                    improve their teaching methods and techniques. I am currently pursuing a technician degree in
                    computer software technology from Székesfehérvári SZC Széchenyi István Műszaki Technikum, where I am
                    learning about software development, testing, debugging, and maintenance. I am passionate about
                    sharing my knowledge and enthusiasm for coding and technology with the next generation of digital
                    natives, and I am always looking for new ways to make learning fun and interactive. My core
                    competencies include instructional coaching, program creation, lecturing, and coding.
                </Typography>
            </Box>
            <Box>
                <Typography sx={{
                    borderBottom: "1px solid",
                    color: "text.primary",
                    marginBottom: "1rem",
                }} variant="h4">Experience</Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}>
                    <ActivityCard
                        avatar="/logiscool.png"
                        title="Instructor"
                        at="Logiscool Ltd."
                        date="November 2023 - Present"
                        location="Székesfehérvár, Fejér, Hungary"
                        experience={[
                            "Instructional coaching",
                            "Program creation",
                            "Lecturing",
                            "Coding",
                            "Digital literacy",
                        ]}
                    />
                </Box>
            </Box>
            <Box>
                <Typography sx={{
                    borderBottom: "1px solid",
                    color: "text.primary",
                    marginBottom: "1rem",
                }} variant="h4">Education</Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}>
                    <ActivityCard
                        avatar="/szechenyi.jpeg"
                        title="Computer Software Technology/Technician"
                        at="Székesfehérvári SZC Széchenyi István Műszaki Technikum"
                        date="September 2021 - June 2026"
                        location="Székesfehérvár, Fejér, Hungary"
                        experience={[
                            "Project-based learning",
                            "Project management",
                            "Software development",
                            "Testing, debugging, and maintenance",
                        ]}
                    />
                </Box>
            </Box>
            <Divider sx={{
                borderBottom: "1px solid",
                color: "text.primary",
                margin: ".25rem 0",
            }}/>
            <Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    justifyContent: 'space-around',
                }}>
                {projects.map((project, i) => (
                    <ProjectCard key={i} project={project}/>
                ))}
                </Box>
            </Box>
        </Container>
    )
}

export default Home
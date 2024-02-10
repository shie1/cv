import type {NextPage} from 'next'
import {Avatar, Box, Container, Divider, Typography, useMediaQuery} from "@mui/material";
import {ActivityCard, ProjectCard, SkillsList, SocialLinks} from "@/pages/index";
import {globalData, hungarianData as data} from "@/data";
import {hungarianTranslations as translations} from "@/translations";

const Home: NextPage = () => {
    const print = useMediaQuery("print")

    return (
        <Container sx={{
            padding: print ? 0 : "1rem 0",
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
            width: "100%",
            pageBreakAfter: "avoid",
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
                    <Typography variant="h1">{data.name}</Typography>
                    <Typography variant="h2">{data.title}</Typography>
                    <Typography variant="h3">{data.location}</Typography>
                    <SocialLinks links={globalData.socials}/>
                </Box>
            </Box>
            <Box>
                <Typography sx={{
                    borderBottom: "1px solid",
                    color: "text.primary",
                    marginBottom: "1rem",
                }} variant={"h4"}>{translations.skills}</Typography>
                <SkillsList skills={data.skills}/>
            </Box>
            <Box>
                <Typography sx={{
                    borderBottom: "1px solid",
                    color: "text.primary",
                }} variant="h4">{translations.about}</Typography>
                <Typography sx={{
                    color: "text.secondary",
                }} variant="body1">
                    {data.about}
                </Typography>
            </Box>
            <Box>
                <Typography sx={{
                    borderBottom: "1px solid",
                    color: "text.primary",
                    marginBottom: "1rem",
                }} variant="h4">{translations.experience}</Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}>
                    {data.experience.map((experience, i) => (
                        <ActivityCard key={i} {...experience}/>
                    ))}
                </Box>
            </Box>
            <Box>
                <Typography sx={{
                    borderBottom: "1px solid",
                    color: "text.primary",
                    marginBottom: "1rem",
                }} variant="h4">{translations.education}</Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}>
                    {data.education.map((education, i) => (
                        <ActivityCard key={i} {...education}/>
                    ))}
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
                    {data.projects.map((project, i) => (
                        <ProjectCard key={i} project={project}/>
                    ))}
                </Box>
            </Box>
        </Container>
    )
}

export default Home
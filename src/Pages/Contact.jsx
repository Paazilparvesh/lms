import ContactHero from "/src/Components/ContactComponents/ContactHero.jsx"
import ContactTouch from "/src/Components/ContactComponents/ContactTouch.jsx"
import ContactQuery from "/src/Components/ContactComponents/ContactQuery.jsx"
import Chatbot from "../NewHome/Chatbot";
import ChatbotWrapper from "./ChatbotWrapper";

function About() {

    return (
        <>
        <ContactHero />

        {/* <ContactTouch /> */}

        <ContactQuery />
        <Chatbot />
        <ChatbotWrapper />
        
        </>
    );
}

export default About;
import SidebarWithHeader from "../src/Components/shared/SideBar.jsx";
import {Text} from "@chakra-ui/react";

const Home = () => {

    return (
        <SidebarWithHeader>
            <Text color={'whiteAlpha.700'} fontSize={"4xl"}>Dashboard</Text>
            <Text color={'whiteAlpha.700'} fontSize={"2xl"}>Autolytics</Text>
        </SidebarWithHeader>
    )
}

export default Home;
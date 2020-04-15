import React from "react";
import { PageContainer } from "../components/ui";
import { withReduxDynamicModules } from "@cupcake/webcore";

const Profile: React.FC<any> = () => {
    return (
        <PageContainer>
            <p>Hello World</p>
        </PageContainer>
    );
}

export default withReduxDynamicModules(Profile, []);
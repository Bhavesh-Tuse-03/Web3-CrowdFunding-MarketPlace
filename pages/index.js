import React, { useEffect, useContext, useState } from 'react';
import { CrowdFundingContext } from '@/Context/CrowdFunding';
import { Hero, Card, PopUp } from '@/Components/index';

const Index = () => {
    const {
        titleData,
        getCampaigns,
        createCampaign,
        donate,
        getUserCampaigns,
        getDonations,
    } = useContext(CrowdFundingContext);

    const [allcampaign, setAllcampaign] = useState([]);
    const [usercampaign, setUsercampaign] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const allData = await getCampaigns();
            const userData = await getUserCampaigns();
            setAllcampaign(allData);
            setUsercampaign(userData);
        };
        fetchData();
    }, [getCampaigns, getUserCampaigns]);

    const handleCreateCampaign = async (newCampaign) => {
        try {
            const data = await createCampaign(newCampaign);
            console.log('Campaign created:', data);
            // Update the state with the new campaign
            setAllcampaign((prev) => [...prev, data]);
            setUsercampaign((prev) => [...prev, data]);
        } catch (error) {
            console.error('Error creating campaign:', error);
        }
    };

    // Donate Popup model
    const [openModel, setOpenModel] = useState(false);
    const [donateCampaign, setDonateCampaign] = useState();

    console.log(donateCampaign);

    return (
        <>
            <Hero title={titleData} createCampaign={handleCreateCampaign} />
            <Card
                title="All Listed Campaign"
                allcampaign={allcampaign}
                setOpenModel={setOpenModel}
                setDonate={setDonateCampaign}
            />
            <Card
                title="Your Created Campaign"
                allcampaign={usercampaign}
                setOpenModel={setOpenModel}
                setDonate={setDonateCampaign}
            />
            {openModel && (
                <PopUp
                    setOpenModel={setOpenModel}
                    getDonations={getDonations}
                    donate={donateCampaign}
                    donateFunction={donate}
                />
            )}
        </>
    );
};

export default Index;
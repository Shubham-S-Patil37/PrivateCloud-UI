import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { faCloudArrowUp, faUserShield, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTeamspeak } from '@fortawesome/free-brands-svg-icons';

import Nav from "./../../components/nav/index"
import ServiceCard from '../../components/service-card'
import ContactUS from '../../components/contact-us';
import PricingCard from '../../components/pricing-card';
import ToggleButton from '../../components/toggle-button';

import home from "./../../assets/hom1.png"

import "./home.css"


const Home = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    const homeRef = useRef<HTMLDivElement | null>(null);
    const aboutRef = useRef<HTMLDivElement | null>(null);
    const pricingRef = useRef<HTMLDivElement | null>(null);
    const contactUsRef = useRef<HTMLDivElement | null>(null);

    const [proPrice, setProPrice] = useState(299)
    const [premiumPrice, setPremiumPrice] = useState(499)

    interface ServiceItem {
        icon: IconDefinition;
        title: string;
        description: string;
    }

    interface pricing {
        title: string;
        price: number;
        serviceCover: string[]
    }

    const service: ServiceItem[] = [
        { "icon": faFaceSmile, "title": "Easy to use", "description": "Upload files seamlessly with a user-friendly interface, supporting files up to 15 MB" },
        { "icon": faCloudArrowUp, "title": "99% uptime guarantee", "description": " Reliable cloud storage ensures your files are always accessible, anytime you need them" },
        { "icon": faUserShield, "title": "Safe and secured", "description": "Protects your data with robust encryption, providing 1 GB of secure cloud storage per user" },
        { "icon": faTeamspeak, "title": "Our dedicated support", "description": "Reach out anytime for expert assistance; we're here to make your experience smooth and hassle-free" }
    ]

    const pricing: pricing[] = [
        { "title": "Free", "price": 0, "serviceCover": ["1 GB Cloud Storage", "10 User sharing per day", "File Size 15 MB"] },
        { "title": "Pro", "price": proPrice, "serviceCover": ["5 GB Cloud Storage", "30 User sharing per day", "File Size 15 MB"] },
        { "title": "Premium", "price": premiumPrice, "serviceCover": ["15 GB Cloud Storage", "50 User sharing per day", "File Size 15 MB"] }
    ]

    const onToggleChange = (changed: boolean) => {

        if (changed) {
            setProPrice(299)
            setPremiumPrice(499)
        }
        else {
            setProPrice(3300)
            setPremiumPrice(5700)
        }

    }

    const onClickNavItem = (menuClicked: string) => {
        if (menuClicked == "Home")
            homeRef.current!.scrollIntoView({ behavior: 'smooth' });
        else if (menuClicked == "About")
            aboutRef.current!.scrollIntoView({ behavior: 'smooth' });
        else if (menuClicked == "Pricing")
            pricingRef.current!.scrollIntoView({ behavior: 'smooth' });
        else if (menuClicked == "Contact Us")
            contactUsRef.current!.scrollIntoView({ behavior: 'smooth' });
        else if (menuClicked == "Log in")
            navigate('/login');
    }

    return (
        <>
            <Nav onClickNavItem={onClickNavItem} />
            <div className='home-parent' ref={homeRef}>
                <div className='home-section-1'>
                    <img src={home} alt="home" style={{ width: "100%" }} />
                </div>
                <div className='home-section-2'>
                    <div>
                        <div className='home-section-2-title-1'>
                            We provide the <span className="highlight">best customer service</span>
                        </div>
                        <div className='home-section-2-description'>
                            We are a cloud provider offering 1 GB of free storage space for users to securely store and access their files. Upload files up to 15 MB with ease and confidence. Enjoy fast, reliable access to your data anytime, anywhere
                        </div>
                        <button className='create-free-account' onClick={() => navigate('/login')}> Create Free Account</button>
                    </div>
                </div>
            </div>
            {/* *************************************************************** HOME END ******************************************************************** */}
            <div className='about-parent' ref={aboutRef}>
                <div className='about-tile'>WHY <span className='about-title-sub'>CHOOSE US</span></div>
                <div className='about-card-parent'>
                    {
                        service.map((item) =>
                            <ServiceCard data={item} />
                        )
                    }
                </div>
                <div className='about-description'>
                    <div className='about-info'>
                        <div>
                            <div>WE'VE GOT THE PERFECT </div>
                            <div>HOSTING PLAN FOR YOU</div>
                        </div>
                        <input type="button" value="See Plain" className='see-plain' onClick={() => pricingRef.current!.scrollIntoView({ behavior: 'smooth' })} />
                    </div>
                </div>
            </div >
            {/* *************************************************************** About US END ******************************************************************** */}
            <div className='pricing-parent' ref={pricingRef}>
                <div className='pricing-title'>
                    Plan
                </div>

                <div className='toggle-parent'>
                    <ToggleButton title1='Monthly' title2='Annually' onToggleChange={onToggleChange} />
                </div>
                <div className='pricing-card-parent'>
                    {
                        pricing.map((item: pricing) => (
                            <PricingCard title={item.title} price={item.price} serviceCover={item.serviceCover} />
                        ))
                    }
                </div>
            </div >
            {/* *************************************************************** Pricing END ******************************************************************** */}
            <div ref={contactUsRef}>
                < ContactUS />
            </div>
        </>
    )
}

export default Home;
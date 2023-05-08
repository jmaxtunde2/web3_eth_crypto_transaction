import {BsShieldFillCheck} from 'react-icons/bs';
import {BiSearchAlt } from 'react-icons/bi';
import {RiHeart2Fill } from 'react-icons/ri';

const ServiceCard = ({title, subTitle,icon,color}) => (
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor:pointer hover:shadow-2xl">
         <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className="ml-5 flex flex-col flex-1">
            <h3 className="mt-2 text-white text-lg">{title}</h3>
            <p className="mt-1 text-white text-sm md:w-9/12">
                {subTitle}
            </p>
        </div>
    </div>
);

const Services = () =>{
    return (
        <div className="flex flex-col flex md:flex-row justify-center items-center gradient-bg-services">
            <div className="flex mf:flex-row items-center justify-between md:p-20 py-12 px-4">
                <div className="flex-1 flex flex-col justify-start items-center">
                    <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
                        Services we <br/> continue to improve
                    </h1>
                </div>
                <div className="flex-1 flex flex-col justify-start items-center">
                    <ServiceCard 
                        color ="bg-[#2952E3]"
                        title="Security Guarantee"
                        icon={<BsShieldFillCheck fontSize={21} className="text-white"/>}
                        subTitle="Security is alway guarante. We always maintain the quality of our product."
                    />

                    <ServiceCard 
                        color ="bg-[#8945F8]"
                        title="Security Guarantee"
                        icon={<BiSearchAlt fontSize={21} className="text-white"/>}
                        subTitle="Security is alway guarante. We always maintain the quality of our product."
                    />

                    <ServiceCard 
                        color ="bg-[#F84550]"
                        title="Fastest Transactions"
                        icon={<RiHeart2Fill fontSize={21} className="text-white"/>}
                        subTitle="Security is alway guarante. We always maintain the quality of our product."
                    />
                </div>

            </div>
        </div>
    );
}
export default Services;
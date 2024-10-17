import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import BackButton from "../Components/BackButton";



const About = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate("/");
  };

  return (
    < div className="w-full h-full min-h-screen bg-black overflow-y-auto pb-[150px] pt-6">
      <BackButton navigateBack={handleBackButtonClick} />
  
      <div className="container mx-auto items-center px-4">
        <div className="items-center text-center">
          <h1 className="text-[35px] font-bold bg-gradient-to-r from-yellow-500 to-pink-500   bg-clip-text text-transparent">Game Info</h1>
        </div>
        <div className="text-center">
          <p className="text-white opacity-50">Orion Protocol is a comprehensive DeFi and cross-chain trading platform designed to unify liquidity across centralized and decentralized exchanges.</p>
          <h1 className="text-white mt-2 text-[20px]">Orion Protocol Overview</h1>
        </div>

        <div className="text-center">
          <h1 className="text-white mt-2 text-[20px] text-start"> Core Features:</h1>
          <p className="text-white opacity-50  text-center py-2">Aggregated Liquidity: Combines liquidity from major centralized exchanges (CEXs), decentralized exchanges (DEXs), and swap pools into a single platform. Users can trade crypto assets at the best possible rates with low slippage.

Interoperability: Supports multiple blockchains and protocols, allowing seamless cross-chain swaps without needing to transfer tokens to different networks.

DeFi Integration: Provides yield farming, staking, and lending opportunities, enabling users to earn rewards or interest on their assets directly on the platform.

Decentralized Governance: Token holders participate in the protocol's decision-making, voting on key updates, fee structures, and new blockchain integrations.

Security & Compliance: Focuses on user protection with smart contract audits, insurance options for liquidity providers, and compliance features for regulatory adherence.</p>
        </div>


        <div className="text-center">
          <h1 className="text-white mt-2 text-[20px] text-start"> Ecosystem Components:</h1>
          <p className="text-white opacity-50  text-center py-2">Orion DEX: A decentralized exchange that leverages liquidity from both on-chain and off-chain sources to ensure users always get the best price.

Orion Vault: A DeFi hub where users can stake assets, provide liquidity, and farm yield with competitive APRs.

Orion Bridge: Facilitates seamless cross-chain swaps and bridging for major cryptocurrencies and tokens.

Orion Wallet: A non-custodial wallet that supports multi-chain assets, integrates staking, and allows direct access to DeFi services.</p>
        </div>

        <div className="text-center">
          <h1 className="text-white mt-2 text-[20px] text-start"> Security Measures:</h1>
          <p className="text-white opacity-50  text-center py-2">Multi-layer Smart Contract Audits: Conducted by top auditing firms to minimize vulnerabilities.

Insurance Pools: Provides coverage for users’ funds in case of hacks or smart contract exploits.

KYC & AML Options: While Orion is decentralized, users can choose KYC compliance for additional benefits, like access to higher trading limits or insurance options.</p>
        </div>


        <div className="text-center">
          <h1 className="text-white mt-2 text-[20px] text-start"> Use Cases:</h1>
          <p className="text-white opacity-50  text-center py-2">Traders: Access aggregated liquidity and cross-chain trading without needing multiple accounts across exchanges.

DeFi Users: Earn yield, provide liquidity, and manage their assets all within one integrated platform.

Governance Participants: Shape the protocol’s future by voting on proposals and participating in key decisions.
</p>
        </div>
      
      </div>
      <Footer />
    </div>
  );
};

export default About;

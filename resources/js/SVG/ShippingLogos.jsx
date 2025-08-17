import React from 'react';

const CrateShippingLogo = ({ width = 100, height = 100, className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 100 80" className={className}>

    <rect x="20" y="30" width="35" height="18" rx="2" fill="#3B82F6"/>
    <rect x="58" y="30" width="15" height="18" rx="2" fill="#3B82F6"/>
    <circle cx="28" cy="52" r="4" fill="#374151"/>
    <circle cx="65" cy="52" r="4" fill="#374151"/>


    <rect x="76" y="25" width="15" height="15" rx="1" fill="none" stroke="#3B82F6" strokeWidth="2"/>
    <line x1="79" y1="25" x2="88" y2="34" stroke="#3B82F6" strokeWidth="1"/>
    <line x1="88" y1="25" x2="79" y2="34" stroke="#3B82F6" strokeWidth="1"/>

    <text x="50" y="70" textAnchor="middle" fontSize="10" fill="#64748B">Shipping</text>
  </svg>
);


const PickupDateLogo = ({ width = 100, height = 120, className = "" , pickup_data}) => (
  <svg width={width} height={height} viewBox="0 0 100 98" className={className}>

    <rect x="30" y="25" width="25" height="25" rx="2" fill="#10B981"/>
    <rect x="32" y="30" width="21" height="17" fill="white"/>
    <rect x="30" y="25" width="25" height="6" rx="2" fill="#10B981"/>


    <circle cx="35" cy="22" r="1" fill="white"/>
    <circle cx="50" cy="22" r="1" fill="white"/>


    <text x="42.5" y="42" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#10B981">15</text>


    <circle cx="65" cy="37.5" r="10" fill="none" stroke="#10B981" strokeWidth="2"/>
    <line x1="65" y1="37.5" x2="65" y2="32" stroke="#10B981" strokeWidth="2"/>
    <line x1="65" y1="37.5" x2="70" y2="40" stroke="#10B981" strokeWidth="1"/>

    <text x="50" y="75" textAnchor="middle" fontSize="12" fill="#64748B">Schedule</text>
    <text x="50" y="90" textAnchor="middle" fontSize="13" fill="currentColor">{pickup_data}</text>
  </svg>
);


const DestinationLogo = ({ width = 100, height = 120, className = "" ,message}) => (
  <svg width={width} height={height} viewBox="0 0 100 98" className={className}>

    <path d="M 45 30 C 45 26, 49 22, 53 22 C 57 22, 61 26, 61 30 C 61 34, 53 45, 53 45 C 53 45, 45 34, 45 30 Z" fill="#F59E0B"/>
    <circle cx="53" cy="30" r="3" fill="white"/>


    <path d="M 20 40 Q 35 32, 50 38 Q 65 42, 80 35" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4,2"/>

    <circle cx="20" cy="40" r="3" fill="#F59E0B"/>

    <text x="50" y="73" textAnchor="middle" fontSize="12" fill="#64748B">Destination</text>
    <text x="50" y="90" textAnchor="middle" fontSize="13" fill="currentColor">{message}</text>
  </svg>
);


const TotalPalletLogo = ({ width = 100, height = 120, className = "" ,message}) => (
  <svg width={width} height={height} viewBox="0 0 100 98" className={className}>

    <rect x="25" y="45" width="50" height="4" rx="1" fill="#8B4513"/>
    <rect x="28" y="42" width="44" height="3" rx="1" fill="#A0522D"/>


    <rect x="32" y="49" width="2" height="8" fill="#8B4513"/>
    <rect x="41" y="49" width="2" height="8" fill="#8B4513"/>
    <rect x="50" y="49" width="2" height="8" fill="#8B4513"/>
    <rect x="59" y="49" width="2" height="8" fill="#8B4513"/>
    <rect x="66" y="49" width="2" height="8" fill="#8B4513"/>

    <rect x="30" y="25" width="15" height="17" rx="1" fill="#DC2626"/>
    <rect x="47" y="25" width="15" height="17" rx="1" fill="#2563EB"/>
    <rect x="35" y="18" width="15" height="12" rx="1" fill="#059669"/>
    <rect x="52" y="15" width="12" height="15" rx="1" fill="#F59E0B"/>


    <circle cx="75" cy="25" r="8" fill="#7C3AED"/>
    <text x="75" y="28" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">4</text>

    <text x="50" y="73" textAnchor="middle" fontSize="12" fill="#64748B">Total Pallet</text>
    <text x="50" y="90" textAnchor="middle" fontSize="13" fill="currentColor">{message}</text>
  </svg>
);

const ContainerLogo = ({ width = 120, height = 120, className = "",message }) => (
  <svg width={width} height={height} viewBox="0 0 120 98" className={className}>

    <rect x="20" y="25" width="60" height="25" rx="2" fill="#1F2937"/>
    <rect x="22" y="27" width="56" height="21" fill="#374151"/>


    <line x1="28" y1="25" x2="28" y2="50" stroke="#1F2937" strokeWidth="1"/>
    <line x1="34" y1="25" x2="34" y2="50" stroke="#1F2937" strokeWidth="1"/>
    <line x1="46" y1="25" x2="46" y2="50" stroke="#1F2937" strokeWidth="1"/>
    <line x1="58" y1="25" x2="58" y2="50" stroke="#1F2937" strokeWidth="1"/>
    <line x1="70" y1="25" x2="70" y2="50" stroke="#1F2937" strokeWidth="1"/>
    <line x1="76" y1="25" x2="76" y2="50" stroke="#1F2937" strokeWidth="1"/>


    <rect x="80" y="25" width="20" height="25" rx="2" fill="#DC2626"/>
    <rect x="82" y="27" width="16" height="21" fill="#EF4444"/>
    <line x1="90" y1="27" x2="90" y2="48" stroke="#DC2626" strokeWidth="1"/>


    <rect x="85" y="35" width="2" height="3" fill="#1F2937"/>
    <rect x="93" y="35" width="2" height="3" fill="#1F2937"/>


    <text x="50" y="40" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#9CA3AF">CNT-001</text>


    <rect x="10" y="50" width="100" height="3" fill="#6B7280"/>
    <line x1="50" y1="15" x2="50" y2="25" stroke="#F59E0B" strokeWidth="3"/>
    <circle cx="50" cy="15" r="2" fill="#F59E0B"/>

    <text x="60" y="70" textAnchor="middle" fontSize="12" fill="#64748B">Container</text>
    <text x="60" y="90" textAnchor="middle" fontSize="13" fill="currentColor">{message}</text>
  </svg>
);

const PickupTimeLogo = ({ width = 100, height = 80, className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 100 80" className={className}>

    <circle cx="50" cy="37.5" r="15" fill="#8B5CF6"/>
    <circle cx="50" cy="37.5" r="12" fill="white"/>


    <line x1="50" y1="37.5" x2="50" y2="30" stroke="#8B5CF6" strokeWidth="2"/>
    <line x1="50" y1="37.5" x2="56" y2="37.5" stroke="#8B5CF6" strokeWidth="1.5"/>
    <circle cx="50" cy="37.5" r="1.5" fill="#8B5CF6"/>

    <circle cx="50" cy="28" r="1" fill="#8B5CF6"/>
    <circle cx="59" cy="37.5" r="1" fill="#8B5CF6"/>
    <circle cx="50" cy="47" r="1" fill="#8B5CF6"/>
    <circle cx="41" cy="37.5" r="1" fill="#8B5CF6"/>

    <text x="50" y="70" textAnchor="middle" fontSize="10" fill="#64748B">Pickup Time</text>
  </svg>
);


const ExpressDeliveryLogo = ({ width = 120, height = 80, className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 120 80" className={className}>

    <rect x="40" y="30" width="30" height="15" rx="2" fill="#EF4444"/>
    <rect x="72" y="30" width="18" height="15" rx="2" fill="#EF4444"/>
    <circle cx="48" cy="50" r="4" fill="#374151"/>
    <circle cx="78" cy="50" r="4" fill="#374151"/>


    <line x1="15" y1="32" x2="35" y2="32" stroke="#EF4444" strokeWidth="2"/>
    <line x1="18" y1="37" x2="35" y2="37" stroke="#EF4444" strokeWidth="2"/>
    <line x1="20" y1="42" x2="35" y2="42" stroke="#EF4444" strokeWidth="2"/>

    <path d="M 95 28 L 100 35 L 97 35 L 102 42 L 97 35 L 100 35 Z" fill="#F59E0B"/>

    <text x="60" y="70" textAnchor="middle" fontSize="10" fill="#64748B">Express</text>
  </svg>
);


const GlobalShippingLogo = ({ width = 100, height = 80, className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 100 80" className={className}>

    <circle cx="50" cy="37.5" r="18" fill="none" stroke="#3B82F6" strokeWidth="2"/>


    <circle cx="45" cy="32" r="3" fill="#3B82F6"/>
    <circle cx="55" cy="40" r="2" fill="#3B82F6"/>
    <circle cx="42" cy="43" r="2" fill="#3B82F6"/>


    <line x1="20" y1="37.5" x2="32" y2="37.5" stroke="#10B981" strokeWidth="2" strokeDasharray="3,2"/>
    <line x1="68" y1="37.5" x2="80" y2="37.5" stroke="#10B981" strokeWidth="2" strokeDasharray="3,2"/>


    <circle cx="20" cy="37.5" r="2" fill="#EF4444"/>
    <circle cx="80" cy="37.5" r="2" fill="#10B981"/>

    <text x="50" y="70" textAnchor="middle" fontSize="10" fill="#64748B">Global</text>
  </svg>
);

const BookLogo = ({width = 100, height = 80, className = "" }) =>(

<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
  <g>
    <path d="M2 2 L22 2 L22 22 L17 17 L12 22 L7 17 L2 22 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M12 17 L12 2" stroke="currentColor" strokeWidth="2"/>
  </g>
</svg>
);

const RemoveLogo = ({width = 100, height = 80, className = "" }) =>(
    <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <g>
            <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="22" y1="2" x2="2" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </g>
    </svg>
);

const ExcelFileSvg = ({message,size}) =>(
<svg width="400" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">

  <rect width="400" height="80" rx="8" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1"/>


  <g transform="translate(16, 16)">

    <path d="M0 4C0 1.79086 1.79086 0 4 0H24L36 12V44C36 46.2091 34.2091 48 32 48H4C1.79086 48 0 46.2091 0 44V4Z"
          fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1"/>


    <path d="M24 0V10C24 11.1046 24.8954 12 26 12H36L24 0Z"
          fill="#E5E7EB"/>


    <rect x="4" y="18" width="28" height="20" rx="2" fill="#10B981"/>


    <line x1="12" y1="18" x2="12" y2="38" stroke="white" strokeWidth="1" opacity="0.6"/>
    <line x1="18" y1="18" x2="18" y2="38" stroke="white" strokeWidth="1" opacity="0.6"/>
    <line x1="24" y1="18" x2="24" y2="38" stroke="white" strokeWidth="1" opacity="0.6"/>
    <line x1="4" y1="26" x2="32" y2="26" stroke="white" strokeWidth="1" opacity="0.6"/>
    <line x1="4" y1="32" x2="32" y2="32" stroke="white" strokeWidth="1" opacity="0.6"/>


    <text x="18" y="31" fontFamily="Arial, sans-serif" fontSize="7" fontWeight="bold"
          textAnchor="middle" fill="white">XLS</text>
  </g>


  <g transform="translate(68, 0)">

    <text x="8" y="28" fontFamily="Inter, Arial, sans-serif" fontSize="14" fontWeight="600"
          fill="#111827">{message}</text>


    <text x="8" y="44" fontFamily="Inter, Arial, sans-serif" fontSize="12"
          fill="#6B7280">{size}&nbsp;Kb</text>


    <circle cx="8" cy="56" r="3" fill="#10B981"/>
    <text x="18" y="60" fontFamily="Inter, Arial, sans-serif" fontSize="11"
          fill="#10B981">Uploaded successfully</text>
  </g>





</svg>
);
export {
  CrateShippingLogo,
  PickupDateLogo,
  DestinationLogo,
  PickupTimeLogo,
  ExpressDeliveryLogo,
  GlobalShippingLogo,
  TotalPalletLogo,
  ContainerLogo,
  BookLogo,
  RemoveLogo,
   ExcelFileSvg ,
};

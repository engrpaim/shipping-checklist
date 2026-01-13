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

const Nodata = ({})=>(

<svg width="400" height="300" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">

  <circle cx="150" cy="100" r="80" fill="#f0f9ff" opacity="0.5"/>
  <circle cx="150" cy="100" r="60" fill="#dbeafe" opacity="0.3"/>


  <rect x="100" y="70" width="100" height="60" rx="8" fill="none" stroke="#60a5fa" strokeWidth="2"/>
  <path d="M120 70 L120 60 Q120 55 125 55 L175 55 Q180 55 180 60 L180 70" fill="none" stroke="#60a5fa" strokeWidth="2"/>

  <circle cx="80" cy="50" r="3" fill="#f59e0b" opacity="0.8"/>
  <circle cx="220" cy="40" r="2" fill="#ef4444" opacity="0.8"/>
  <circle cx="250" cy="80" r="2.5" fill="#10b981" opacity="0.8"/>
  <circle cx="50" cy="120" r="2" fill="#8b5cf6" opacity="0.8"/>


  <text x="150" y="160" textAnchor="middle" fill="#64748b" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="500">No Data Available</text>


</svg>
);

const Truck = ({width = 50, height = 50, className = "truck-icon", fill ='red' }) => (
  <svg
    fill={fill}
    height={height}
    width={width}
    version="1.1"
    id="Icons"
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    className={className}
  >
    <g>
      <circle cx="24" cy="24" r="3" />
      <circle cx="8" cy="24" r="3" />
      <path d="M29.8,17.4l-4-5C25.6,12.1,25.3,12,25,12h-5V9c0-0.6-0.4-1-1-1H3C2.4,8,2,8.4,2,9v15c0,0.6,0.4,1,1,1h0.1   C3,24.7,3,24.3,3,24c0-2.8,2.2-5,5-5s5,2.2,5,5c0,0.3,0,0.7-0.1,1H19h0.1C19,24.7,19,24.3,19,24c0-2.8,2.2-5,5-5s5,2.2,5,5   c0,0.3,0,0.7-0.1,1H29c0.6,0,1-0.4,1-1v-6C30,17.8,29.9,17.6,29.8,17.4z" />
    </g>
  </svg>
);


const Ticket = ({width = 50, height = 50, className = "ticket-icon", fill ='currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    width={width}
    viewBox="0 -960 960 960"
    fill={fill}

  >
    <path d="m354-334 356-94q15-4 22.5-18.5T736-476q-4-15-17.5-22.5T690-502l-98 26-160-150-56 14 96 168-96 24-50-38-38 10 66 114Zm446 174H160q-33 0-56.5-23.5T80-240v-160q33 0 56.5-23.5T160-480q0-33-23.5-56.5T80-560v-160q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160Zm0-80v-480H160v102q37 22 58.5 58.5T240-480q0 43-21.5 79.5T160-342v102h640ZM480-480Z" />
  </svg>
);


const ArrowIcon = ({width = 50, height = 50, className = "logout-icon", fill ='currentColor' })  => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    width={width}
    viewBox="0 -960 960 960"
    fill={fill}
    className={className}

  >
    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
  </svg>
);

const DropBox = ({width = 50, height = 50, className = "", fill ='currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    width={width}
    viewBox="0 -960 960 960"
    fill={fill}
    className={className}
  >
    <path d="M640-640h120-120Zm-440 0h338-18 14-334Zm16-80h528l-34-40H250l-34 40Zm184 270 80-40 80 40v-190H400v190Zm182 330H200q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v196q-19-7-39-11t-41-4v-122H640v153q-35 20-61 49.5T538-371l-58-29-160 80v-320H200v440h334q8 23 20 43t28 37Zm138 0v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z"/>
  </svg>
);

const ShieldIcon = ({width = 50, height = 50, className = "shield-icon", fill ='currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    width={width}
    height={height| "24"}
    viewBox="0 0 45.413 45.412"
    className={className}
  >
    <defs>
      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(42, 155, 42, 1)" />
        <stop offset="50%" stopColor="rgba(167, 199, 87, 1)" />
        <stop offset="100%" stopColor="rgba(237, 221, 83, 1)" />
      </linearGradient>
    </defs>
    <g fill="url(#shieldGradient)">
      <g>
        <path d="M42.821,6.161L23.453,0.113c-0.486-0.151-1.006-0.151-1.492,0L2.593,6.161c-1.045,0.326-1.758,1.294-1.758,2.39    c0,26.781,13.531,33.182,20.801,36.621c0.339,0.16,0.705,0.24,1.071,0.24s0.731-0.08,1.069-0.24    c7.271-3.438,20.802-9.84,20.802-36.621C44.579,7.456,43.866,6.488,42.821,6.161z M22.707,40.137    c-6.902-3.317-16.324-8.812-16.842-29.75l16.842-5.26l16.841,5.26C39.031,31.325,29.608,36.819,22.707,40.137z"/>
        <path d="M8.709,12.477c0,6.185,1.609,11.054,3.783,14.804l17.043-17.043l-6.829-2.133L8.709,12.477z"/>
        <path d="M22.707,37.307c4.785-2.151,13.79-9.353,13.992-24.317l-19.89,19.89C19.104,35.167,21.347,36.592,22.707,37.307z"/>
      </g>
    </g>
  </svg>
);

const Ship = ({ width = 24, height = 24, fill = "currentColor", className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
    viewBox="0 0 50 50"
    className={className}
  >
    <path d="M24 0L24 5L17 5C16.449219 5 16 5.449219 16 6L16 11L11 11C10.449219 11 10 11.449219 10 12L10 17.84375L24.0625 13.15625C24.367188 13.054688 24.679688 13 25 13C25.324219 13 25.664063 13.054688 25.96875 13.15625L40 17.875L40 12C40 11.449219 39.554688 11 39 11L34 11L34 6C34 5.449219 33.554688 5 33 5L26 5L26 0 Z M 25 15C24.894531 15 24.789063 15.027344 24.6875 15.0625L5.46875 21.4375C4.496094 21.761719 3.738281 22.492188 3.3125 23.4375C2.886719 24.382813 2.890625 25.460938 3.3125 26.4375L7 34.21875L7 40.75C7.5 40.402344 8.078125 40.1875 8.6875 40.1875C9.375 40.1875 10.058594 40.441406 10.59375 40.875C11.460938 41.582031 13.058594 41.90625 14.1875 41.90625C15.316406 41.90625 16.945313 41.578125 17.8125 40.875C18.34375 40.441406 19 40.1875 19.6875 40.1875C20.375 40.1875 21.058594 40.441406 21.59375 40.875C22.460938 41.582031 24.058594 41.90625 25.1875 41.90625C26.316406 41.90625 27.941406 41.585938 28.8125 40.875C29.347656 40.441406 30 40.1875 30.6875 40.1875C31.375 40.1875 32.0625 40.441406 32.59375 40.875C33.460938 41.582031 35.058594 41.90625 36.1875 41.90625C37.316406 41.90625 38.941406 41.585938 39.8125 40.875C40.347656 40.441406 41 40.1875 41.6875 40.1875C42.140625 40.1875 42.597656 40.304688 43 40.5L43 34.21875L46.59375 26.4375C47.039063 25.542969 47.078125 24.503906 46.6875 23.5625C46.273438 22.566406 45.433594 21.78125 44.40625 21.4375L25.3125 15.0625C25.210938 15.027344 25.105469 15 25 15 Z M 16.5 25C17.328125 25 18 26.117188 18 27.5C18 28.882813 17.328125 30 16.5 30C15.671875 30 15 28.882813 15 27.5C15 26.117188 15.671875 25 16.5 25 Z M 33.5 25C34.328125 25 35 26.117188 35 27.5C35 28.882813 34.328125 30 33.5 30C32.671875 30 32 28.882813 32 27.5C32 26.117188 32.671875 25 33.5 25 Z M 8.6875 42.1875C8.464844 42.1875 8.246094 42.289063 8.0625 42.4375C6.71875 43.527344 4.59375 43.90625 3.1875 43.90625C2.839844 43.90625 2.515625 43.867188 2.21875 43.84375C1.917969 43.816406 1.660156 43.8125 1.40625 43.8125C0.855469 43.8125 0.40625 44.257813 0.40625 44.8125C0.40625 45.367188 0.855469 45.8125 1.40625 45.8125C1.609375 45.8125 1.820313 45.824219 2.0625 45.84375C2.410156 45.875 2.777344 45.90625 3.1875 45.90625C4.796875 45.90625 6.992188 45.511719 8.6875 44.4375C10.382813 45.511719 12.578125 45.90625 14.1875 45.90625C15.796875 45.90625 17.992188 45.511719 19.6875 44.4375C21.382813 45.511719 23.578125 45.90625 25.1875 45.90625C26.796875 45.90625 28.992188 45.511719 30.6875 44.4375C32.378906 45.511719 34.578125 45.90625 36.1875 45.90625C37.796875 45.90625 39.992188 45.511719 41.6875 44.4375C43.378906 45.511719 45.578125 45.90625 47.1875 45.90625C48.011719 45.90625 48.757813 45.777344 49.375 45.53125C49.886719 45.324219 50.140625 44.730469 49.9375 44.21875C49.730469 43.707031 49.136719 43.453125 48.625 43.65625C48.246094 43.808594 47.753906 43.90625 47.1875 43.90625C45.78125 43.90625 43.683594 43.527344 42.34375 42.4375C41.976563 42.136719 41.429688 42.136719 41.0625 42.4375C39.71875 43.527344 37.59375 43.90625 36.1875 43.90625C34.78125 43.90625 32.683594 43.527344 31.34375 42.4375C30.976563 42.136719 30.429688 42.136719 30.0625 42.4375C28.71875 43.527344 26.59375 43.90625 25.1875 43.90625C23.78125 43.90625 21.683594 43.527344 20.34375 42.4375C19.976563 42.136719 19.429688 42.136719 19.0625 42.4375C17.71875 43.527344 15.59375 43.90625 14.1875 43.90625C12.78125 43.90625 10.683594 43.527344 9.34375 42.4375C9.160156 42.289063 8.910156 42.1875 8.6875 42.1875 Z" />
  </svg>
);
const WarningIcon = ({ size = 24, color = '#ffffff' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512.018 512.018"
    width={size}
    height={size}
    fill={color}
    xmlSpace="preserve"
  >
    <g>
      <g>
        <path d="M509.769,480.665L275.102,11.331c-7.253-14.464-30.933-14.464-38.187,0L2.249,480.665c-3.307,6.613-2.944,14.464,0.939,20.757c3.904,6.272,10.752,10.112,18.155,10.112h469.333c7.403,0,14.251-3.84,18.155-10.112C512.713,495.129,513.075,487.278,509.769,480.665z M256.009,426.201c-11.776,0-21.333-9.557-21.333-21.333s9.557-21.333,21.333-21.333s21.333,9.557,21.333,21.333S267.785,426.201,256.009,426.201z M277.342,340.867c0,11.776-9.536,21.333-21.333,21.333c-11.797,0-21.333-9.557-21.333-21.333V191.534c0-11.776,9.536-21.333,21.333-21.333c11.797,0,21.333,9.557,21.333,21.333V340.867z" />
      </g>
    </g>
  </svg>
);
const CheckCircleIcon = ({ size = 24, color = "#000" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill={color}
  >
    <path d="M20,0C8.974,0,0,8.973,0,20c0,11.027,8.974,20,20,20c11.029,0,20-8.973,20-20C40,8.973,31.029,0,20,0z M28.818,17.875l-8.562,8.564c-0.596,0.595-1.377,0.893-2.158,0.893c-0.779,0-1.561-0.298-2.156-0.893l-4.758-4.758c-1.191-1.191-1.191-3.124,0-4.313c1.191-1.192,3.121-1.192,4.314,0l2.6,2.6l6.408-6.407c1.188-1.189,3.123-1.189,4.312,0C30.01,14.752,30.01,16.684,28.818,17.875z" />
  </svg>
);

const ForkLift = ({ size = 24, color = "#000000", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512.25 512.25"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <path d="m480.25,368.125h-64.25v-304c0-17.672-14.328-32-32-32s-32,14.328-32,32v208c0-12.867-7.516-23.885-18.466-28.967l-32.401-97.393c-13.086-39.266-49.625-65.641-91.008-65.641h-81.875c-17.672,0-32.25,14.328-32.25,32v128h-63.75c-17.672,0-32.25,14.328-32.25,32v128c0,17.672 14.578,32 32.25,32h2.272c7.156,27.523 31.995,48 61.728,48 29.732,0 54.571-20.477 61.728-48h57.054c12.38,28.203 40.498,48 73.219,48s60.839-19.797 73.219-48h118.78c17.672,0 32-14.328 32-32s-14.328-31.999-32-31.999zm-320.25-176v-48h50.125c13.797,0 25.992,8.789 30.352,21.875l24.708,74.125h-56.935c0-26.469-21.25-48-48.25-48zm128.25,224c-8.82,0-16-7.18-16-16s7.18-16 16-16 16,7.18 16,16-7.18,16-16,16z" />
  </svg>
);


const QRIcon = ({ width = "24px", height = "24px", fill = "#000000" }) => (
   <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fill}
  >
    <g>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M16 17v-1h-3v-3h3v2h2v2h-1v2h-2v2h-2v-3h2v-1h1zm5 4h-4v-2h2v-2h2v4zM3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zM6 6h2v2H6V6zm0 10h2v2H6v-2zM16 6h2v2h-2V6z" />
    </g>
  </svg>
);
const CameraIcon = ({ size = 24, color = "#1f1f1f" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 -960 960 960"
    fill={color}

  >
    <path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z" />
  </svg>
);


const CloseIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 208.891 208.891"
    width={size}
    height={size}
    fill={color}
  >
    <path d="M0,170l65.555-65.555L0,38.891L38.891,0l65.555,65.555L170,0l38.891,38.891l-65.555,65.555L208.891,170L170,208.891l-65.555-65.555l-65.555,65.555L0,170z" />
  </svg>
);
const CloseIconCirle = ({
  size = 64,
  bgColor = "#D75A4A",
  strokeColor = "#FFFFFF",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width={size}
    height={size}
  >
    <circle cx="25" cy="25" r="25" fill={bgColor} />

    <polyline
      points="16,34 25,25 34,16"
      fill="none"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeMiterlimit="10"
    />

    <polyline
      points="16,16 25,25 34,34"
      fill="none"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeMiterlimit="10"
    />
  </svg>
);
const UploadIcon = ({ size = 24, color = "#1f1f1f" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 -960 960 960"
    fill={color}
    aria-hidden="true"
  >
    <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
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
   Nodata,
   Truck,
   Ticket,
   ArrowIcon,
   DropBox,
   ShieldIcon,
   Ship,
   WarningIcon,
   CheckCircleIcon,
   ForkLift,
   QRIcon,
   CameraIcon,
   CloseIcon,
   CloseIconCirle,
   UploadIcon

};

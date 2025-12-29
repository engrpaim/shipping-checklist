import '../../css/app.css';
import { WarningIcon,CheckCircleIcon } from '../SVG/ShippingLogos';
export default function Notification({message, type = 'error'}){
    return(
        <div className='notification' style={{ background: type === 'error' ? '#E7180B' :'#2AA63E'}}>
            <div>
                {type === 'error' ? <WarningIcon/> : <CheckCircleIcon/>}
            </div>
            <div>
                <p>{message}</p>
            </div>
        </div>
    );
}

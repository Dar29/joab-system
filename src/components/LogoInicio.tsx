import { Image } from "antd";
import Link from 'next/link';


const LogoInicio = () => {
    return (
        <div
          style={{
            height: 90,
            margin: 16,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Link href="/">
                <Image
                    src="/inicio.png"
                    alt="Logo"
                    width={120}
                    preview={false}
                />
            </Link>
        </div>
    );
};

export default LogoInicio;
import { ReactNode, SVGProps } from "react";
import type { HazardId } from "@/data/hazards";

/**
 * Bộ biểu tượng SVG vẽ riêng cho AI Safe QT.
 * Cùng lưới 24x24, nét 1.75, đầu nét tròn, màu theo chữ (currentColor).
 */
type Props = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number; title?: string };

const make = (paths: ReactNode) => {
  const C = ({ size = 24, title, ...rest }: Props) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title && <title>{title}</title>}
      {paths}
    </svg>
  );
  return C;
};

export const ShieldCheck = make(<><path d="M12 3l7.5 3v5.2c0 4.6-3.1 8.1-7.5 9.8-4.4-1.7-7.5-5.2-7.5-9.8V6L12 3z" /><path d="M8.7 12.2l2.3 2.3 4.4-4.6" /></>);
export const MenuIcon = make(<path d="M4 7h16M4 12h16M4 17h16" />);
export const CloseIcon = make(<path d="M6 6l12 12M18 6L6 18" />);
export const ChatIcon = make(<><path d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2h-6.5L8 20.5V17H5a2 2 0 01-2-2V7a2 2 0 012-2z" /><circle cx="8.5" cy="11" r=".6" fill="currentColor" /><circle cx="12" cy="11" r=".6" fill="currentColor" /><circle cx="15.5" cy="11" r=".6" fill="currentColor" /></>);
export const BranchIcon = make(<><circle cx="6" cy="5.5" r="2" /><circle cx="6" cy="18.5" r="2" /><circle cx="18" cy="12" r="2" /><path d="M6 7.5v9M6 12h10" /></>);
export const TargetIcon = make(<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r=".8" fill="currentColor" /></>);
export const BagIcon = make(<><path d="M7 10a5 5 0 0110 0v8.5a2 2 0 01-2 2H9a2 2 0 01-2-2V10z" /><path d="M10 5.2V4.5a2 2 0 014 0v.7M9.5 15h5" /></>);
export const PinIcon = make(<><path d="M12 21s-6.5-5.4-6.5-10.2a6.5 6.5 0 0113 0C18.5 15.6 12 21 12 21z" /><circle cx="12" cy="10.8" r="2.3" /></>);
export const MegaphoneIcon = make(<><path d="M4 10.5v3h3.2l7.3 4V6.5l-7.3 4H4z" /><path d="M17.5 9.5a3.5 3.5 0 010 5" /><path d="M7.5 13.5l1 5h2l-.8-4" /></>);
export const SendIcon = make(<><path d="M21 3L3 10.8l7 3 3 7L21 3z" /><path d="M10 13.8L15 9" /></>);
export const UserIcon = make(<><circle cx="12" cy="8" r="3.6" /><path d="M5 20a7 7 0 0114 0" /></>);
export const CheckIcon = make(<path d="M5 12.5l4.5 4.5L19 7" />);
export const CrossIcon = make(<path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />);
export const PhoneIcon = make(<path d="M5.2 4h3.4l1.7 4.4-2.1 1.4a11 11 0 005.9 5.9l1.4-2.1 4.4 1.7v3.4a1.4 1.4 0 01-1.5 1.4C10.7 19.7 4.3 13.3 3.8 5.5A1.4 1.4 0 015.2 4z" />);
export const WarningIcon = make(<><path d="M12 4l9 16H3L12 4z" /><path d="M12 10v4.2M12 17h.01" /></>);
export const InfoIcon = make(<><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>);
export const ArrowRight = make(<path d="M5 12h14M13 6l6 6-6 6" />);
export const ExternalIcon = make(<path d="M14 4h6v6M20 4l-9 9M18 14v5H5V6h5" />);
export const MedalIcon = make(<><circle cx="12" cy="9" r="5" /><path d="M9 13.4L7.5 21l4.5-2 4.5 2-1.5-7.6" /></>);
export const RefreshIcon = make(<><path d="M20 11a8 8 0 00-14-4.5L4 9" /><path d="M4 4v5h5" /><path d="M4 13a8 8 0 0014 4.5L20 15" /><path d="M20 20v-5h-5" /></>);

/* Biểu tượng thiên tai */
export const StormIcon = make(<><path d="M12 3.5a8.5 8.5 0 018.5 8.5" /><path d="M12 20.5A8.5 8.5 0 013.5 12" /><path d="M12 7.5a4.5 4.5 0 014.5 4.5" /><path d="M12 16.5A4.5 4.5 0 017.5 12" /><circle cx="12" cy="12" r=".9" fill="currentColor" /></>);
export const FloodIcon = make(<><path d="M4 11l8-6 8 6" /><path d="M6.5 9.5V13M17.5 9.5V13" /><path d="M2.5 15.5c1.5-1.3 3-1.3 4.5 0s3 1.3 4.5 0 3-1.3 4.5 0 3 1.3 4.5 0" /><path d="M2.5 19.5c1.5-1.3 3-1.3 4.5 0s3 1.3 4.5 0 3-1.3 4.5 0 3 1.3 4.5 0" /></>);
export const LandslideIcon = make(<><path d="M3 8.5l8.5 3.5 9.5 7" /><path d="M3 21h18" /><circle cx="14.5" cy="6.5" r="1.7" /><circle cx="18.5" cy="10" r="1.2" /><circle cx="9" cy="5.5" r="1.2" /></>);
export const LightningIcon = make(<path d="M13.2 3L5.5 13.2h5.7L10.3 21l8.2-11h-5.7L13.2 3z" />);
export const SunIcon = make(<><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5" /></>);

export const hazardIcons: Record<HazardId, (p: Props) => JSX.Element> = {
  bao: StormIcon,
  lu: FloodIcon,
  luquet: LandslideIcon,
  set: LightningIcon,
  nang: SunIcon,
};

/* Biểu tượng vật dụng trong túi khẩn cấp */
export const FlashlightIcon = make(<><path d="M8 3h8v4l-1.5 2.5V20a1 1 0 01-1 1h-3a1 1 0 01-1-1V9.5L8 7V3z" /><path d="M12 12.5v2.5" /></>);
export const DropIcon = make(<path d="M12 3.5s6 6.2 6 10.5a6 6 0 01-12 0c0-4.3 6-10.5 6-10.5z" />);
export const BoxIcon = make(<><path d="M3.5 8L12 3.5 20.5 8v8L12 20.5 3.5 16V8z" /><path d="M3.5 8L12 12.5 20.5 8M12 12.5v8" /></>);
export const FirstAidIcon = make(<><rect x="3.5" y="8" width="17" height="12" rx="2" /><path d="M9 8V6.5a1 1 0 011-1h4a1 1 0 011 1V8M12 11.5v5M9.5 14h5" /></>);
export const WhistleIcon = make(<><circle cx="8.5" cy="14.5" r="4" /><path d="M12.2 13.2L21 10.5v4.5l-7.3 1.2" /></>);
export const DocumentIcon = make(<><path d="M7 3h7l4 4v14H7V3z" /><path d="M14 3v4h4M9.5 12h5M9.5 15.5h5" /></>);
export const UmbrellaIcon = make(<><path d="M3.5 12a8.5 8.5 0 0117 0h-17z" /><path d="M12 12v6.5a2 2 0 01-4 0" /></>);
export const RadioIcon = make(<><rect x="3.5" y="8.5" width="17" height="11" rx="2" /><path d="M7 8.5l10-5" /><circle cx="9" cy="14" r="2.2" /><path d="M14.5 12.5h3M14.5 15.5h3" /></>);
export const GamepadIcon = make(<><path d="M7 8h10a4 4 0 014 4v2.5a2.5 2.5 0 01-4.3 1.7L15 14.5H9l-1.7 1.7A2.5 2.5 0 013 14.5V12a4 4 0 014-4z" /><path d="M8 11v3M6.5 12.5h3" /><circle cx="15.5" cy="11.800" r=".6" fill="currentColor" /><circle cx="17.5" cy="13.2" r=".6" fill="currentColor" /></>);
export const FirecrackerIcon = make(<><path d="M9 11l7-7 4 4-7 7-4-4z" /><path d="M9 11l-4.5 4.5M16.5 3v1.5M21 7.5h-1.5" /></>);
export const BlocksIcon = make(<><rect x="4" y="11" width="16" height="9" rx="1" /><path d="M7.5 11V8.5a1.5 1.5 0 013 0V11M13.5 11V8.5a1.5 1.5 0 013 0V11" /></>);
export const ShoeIcon = make(<><path d="M5 5v9c0 2 1.5 3.5 3.5 3.5H20V15l-5-1-4-3L9.5 5H5z" /><path d="M6 17.5V21" /></>);

export const bagIconFor = (name: string) => {
  const m: Record<string, (p: Props) => JSX.Element> = {
    "Đèn pin": FlashlightIcon,
    "Nước uống": DropIcon,
    "Lương khô": BoxIcon,
    "Thuốc và đồ sơ cứu": FirstAidIcon,
    "Còi": WhistleIcon,
    "Giấy tờ quan trọng (bọc ni lông)": DocumentIcon,
    "Áo mưa": UmbrellaIcon,
    "Pin dự phòng / đài radio": RadioIcon,
    "Máy chơi game": GamepadIcon,
    "Pháo / bật lửa": FirecrackerIcon,
    "Đồ chơi lớn": BlocksIcon,
    "Giày cao gót / quần áo đẹp": ShoeIcon,
  };
  return m[name] ?? BoxIcon;
};

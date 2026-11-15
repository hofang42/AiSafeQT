/**
 * Tranh minh họa vẽ riêng: một ngày mưa bão ở vùng quê ven sông, có bạn học sinh mặc áo phao.
 * Chuyển động nhẹ (mây trôi, mưa rơi) và tự tắt khi người dùng chọn giảm chuyển động.
 */
export const HeroScene = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 520 400"
    className={className}
    role="img"
    aria-label="Tranh minh họa: bạn học sinh mặc áo phao đứng trước ngôi nhà bên sông trong cơn mưa, trời đang chuyển sáng"
  >
    {/* mặt trời hé ra sau mây */}
    <circle cx="400" cy="92" r="46" fill="#FFD23F" />
    <g stroke="#FFD23F" strokeWidth="5" strokeLinecap="round">
      <path d="M400 26v-14M400 172v14M334 92h-14M480 92h14M353 45l-10-10M447 139l10 10M447 45l10-10M353 139l-10 10" />
    </g>

    {/* mây lớn có mưa */}
    <g className="drift">
      <path d="M96 150a40 40 0 0138-52 52 52 0 0198-10 44 44 0 0151 62 34 34 0 01-9 66H118a36 36 0 01-22-66z" fill="#7C93A8" />
      <path d="M116 128a30 30 0 0129-38 40 40 0 0176-8 34 34 0 0139 48H122a24 24 0 01-6-2z" fill="#94A9BC" />
      <path d="M200 160l-22 40h16l-12 36 34-48h-18l16-28z" fill="#FFD23F" stroke="#E9B400" strokeWidth="2" strokeLinejoin="round" />
    </g>
    <g stroke="#3E8EDE" strokeWidth="4" strokeLinecap="round">
      <path className="rain-drop" d="M110 214l-6 16" />
      <path className="rain-drop" style={{ animationDelay: ".3s" }} d="M142 220l-6 16" />
      <path className="rain-drop" style={{ animationDelay: ".6s" }} d="M244 214l-6 16" />
      <path className="rain-drop" style={{ animationDelay: ".9s" }} d="M276 222l-6 16" />
      <path className="rain-drop" style={{ animationDelay: ".45s" }} d="M308 212l-6 16" />
      <path className="rain-drop" style={{ animationDelay: ".15s" }} d="M78 232l-6 16" />
    </g>

    {/* đồi xa */}
    <path d="M0 270c60-46 120-56 190-30s120 30 170-4 110-28 160 4v160H0z" fill="#7FB69E" />
    {/* đồi gần */}
    <path d="M0 316c70-34 140-40 220-14s140 22 300-18v116H0z" fill="#5FA582" />

    {/* sông */}
    <path d="M300 400c10-34 30-52 70-62s96-8 150-30v92z" fill="#4FA6D8" />
    <g stroke="#CDEBFA" strokeWidth="3" strokeLinecap="round" fill="none">
      <path d="M352 362c14-6 24 6 38 0s24 6 38 0" />
      <path d="M392 386c12-5 20 5 32 0s20 5 32 0" />
    </g>

    {/* nhà */}
    <g>
      <rect x="92" y="272" width="108" height="76" rx="4" fill="#F4E9D6" />
      <path d="M80 276l66-52 66 52z" fill="#C8553D" />
      <rect x="132" y="304" width="28" height="44" rx="3" fill="#8A5A3C" />
      <rect x="104" y="290" width="22" height="20" rx="3" fill="#BFE3F6" stroke="#8A5A3C" strokeWidth="3" />
      <rect x="168" y="290" width="22" height="20" rx="3" fill="#BFE3F6" stroke="#8A5A3C" strokeWidth="3" />
    </g>

    {/* cây */}
    <rect x="236" y="300" width="8" height="48" rx="3" fill="#7A5230" />
    <circle cx="240" cy="290" r="26" fill="#3F8F6B" />
    <circle cx="224" cy="302" r="16" fill="#4AA27B" />

    {/* bạn học sinh mặc áo phao */}
    <g>
      <ellipse cx="318" cy="352" rx="30" ry="6" fill="#00000022" />
      <rect x="300" y="322" width="10" height="28" rx="4" fill="#2C4A63" />
      <rect x="320" y="322" width="10" height="28" rx="4" fill="#2C4A63" />
      <rect x="291" y="270" width="48" height="58" rx="18" fill="#FF7A1A" />
      <rect x="311" y="272" width="8" height="54" fill="#E86400" />
      <path d="M295 290h40" stroke="#FFE2C4" strokeWidth="5" strokeLinecap="round" />
      <rect x="276" y="282" width="16" height="36" rx="7" fill="#2E86AB" />
      <circle cx="315" cy="252" r="21" fill="#F6C9A3" />
      <path d="M294 248a21 21 0 0142 0c-8-8-34-8-42 0z" fill="#27374D" />
      <circle cx="308" cy="254" r="2.6" fill="#27374D" />
      <circle cx="323" cy="254" r="2.6" fill="#27374D" />
      <path d="M308 262q7 6 14 0" stroke="#27374D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M337 296l22-16" stroke="#F6C9A3" strokeWidth="9" strokeLinecap="round" />
    </g>
  </svg>
);

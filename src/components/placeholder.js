import ContentLoader from "react-content-loader";

export const SkeletonLoader = () => (
    <ContentLoader 
      speed={2}
      width={170}
      height={120}
      viewBox="0 0 170 65"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="4" ry="4" width="38" height="14" /> 
      <rect x="0" y="20" rx="2" ry="2" width="90" height="11" /> 
      <rect x="0" y="34" rx="2" ry="2" width="29" height="11" /> 
      <rect x="0" y="51" rx="3" ry="3" width="53" height="13" /> 
      <rect x="96" y="45" rx="4" ry="4" width="74" height="20" />
    </ContentLoader>
  )
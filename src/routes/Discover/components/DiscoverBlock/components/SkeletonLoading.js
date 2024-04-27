import './SkeletonLoading.scss'; 

const SkeletonLoading = ({ itemCount }) => {
  const loadingItems = Array.from({ length: itemCount || 3 }, (_, index) => (
    <div key={index} className="skeleton-loading-item" />
  ));

  return (
    <div className="skeleton-loading">
      {loadingItems}
    </div>
  );
};

export default SkeletonLoading;

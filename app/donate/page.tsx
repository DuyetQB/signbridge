import Breadcrumb from "@/components/Common/Breadcrumb";
import Donate from "@/components/Donate";

const DonatePage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Donate"
        description="Nhằm giúp chúng tôi có thêm kinh phí để vận hành cũng như phát triển dự án tốt hơn. Bạn có thể donate cho chúng tôi thông qua tài khoản ngân hàng này"
      />

      <Donate />
    </>
  );
};

export default DonatePage;

import React from "react";
import { string } from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import ViewTypeSelector from "../../components/ViewTypeSelector/ViewTypeSelector";

export default function PageTitleButtons({ viewType }) {
  const { companyCode } = useParams();
  const history = useHistory();

  const onChange = ({ type }) => {
    history.replace(`/${companyCode}/?viewType=${type}`);
  };

  return <ViewTypeSelector viewType={viewType} onChange={onChange} />;
}

PageTitleButtons.propTypes = {
  viewType: string
};

PageTitleButtons.defaultProps = {
  viewType: "self"
};

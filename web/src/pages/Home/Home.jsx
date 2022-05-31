import React from "react";
import { useTranslation } from "react-i18next";
import HomeIcon from "@material-ui/icons/Home";
import Page from "../../components/Page/Page";
import PageTitle from "../../components/PageTitle";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <Page>
      <PageTitle
        showBackButton={false}
        crumbs={[
          {
            label: t("Home"),
            Icon: HomeIcon
          }
        ]}
      />
    </Page>
  );
}

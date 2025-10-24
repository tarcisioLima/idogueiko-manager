import { Steps, Drawer } from "antd";

import { Sequence } from "~/types";

type Props = {
  data: Sequence | null;
  open: boolean;
  onClose: () => void;
};

export const SequenceDrawer: React.FC<Props> = ({ data, open, onClose }) => {
  return (
    <Drawer
      title="Posições"
      closable={{ "aria-label": "Fechar" }}
      onClose={onClose}
      open={open}
    >
      {data && data.techniques_detail ? (
        <Steps
          direction="vertical"
          current={data.techniques_detail.length}
          items={data.techniques_detail.map((tec) => ({
            key: tec.id,
            title: `${tec.order}º - ${tec.technique_name}`,
            description: `Lado: ${tec.side}`,
          }))}
        />
      ) : null}
    </Drawer>
  );
};

import { Table, Button, Popconfirm, Tag } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

import { Sequence } from "~/types";

type Props = {
  data: Sequence[];
  onDelete: (id: number) => void;
  loading: boolean;

  setCurrentSequence: (sequence: Sequence) => void;
  openDrawer: () => void;
};

export const SequenceTable: React.FC<Props> = ({
  data,
  onDelete,
  loading,
  setCurrentSequence,
  openDrawer,
}) => {
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Posição",
      dataIndex: "stance",
      key: "stance",
      render: (text) => <Tag>{text}</Tag>,
    },
    {
      title: "Golpes",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <div>{text || "--"}</div>,
    },
    {
      title: "Ações",
      key: "actions",
      render: (record: Sequence) => (
        <>
          <Button
            icon={<EyeOutlined />}
            type="link"
            onClick={() => {
              setCurrentSequence(record);
              openDrawer();
            }}
          />

          <Popconfirm
            title="Tem certeza?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button danger type="link" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Table<Sequence>
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={loading}
    />
  );
};

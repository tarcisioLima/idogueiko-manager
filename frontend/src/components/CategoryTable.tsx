import { Table, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Category } from "~/types";

type Props = {
  data: Category[];
  onEdit: (record: Category) => void;
  onDelete: (id: number) => void;
  loading: boolean;
};

export const CategoryTable: React.FC<Props> = ({
  data,
  onEdit,
  onDelete,
  loading,
}) => {
  const columns = [
    { title: "Nome", dataIndex: "name", key: "name" },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
      render: (text) => <div>{text || "--"}</div>,
    },
    {
      title: "Ações",
      key: "actions",
      render: (record: Category) => (
        <>
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => onEdit(record)}
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
    <Table<Category>
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={loading}
    />
  );
};

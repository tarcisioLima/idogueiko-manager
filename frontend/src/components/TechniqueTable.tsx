import { Table, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Technique } from "~/types";

type Props = {
  data: Technique[];
  onEdit: (record: Technique) => void;
  onDelete: (id: number) => void;
  loading: boolean;
};

export const TechniqueTable: React.FC<Props> = ({
  data,
  onEdit,
  onDelete,
  loading,
}) => {
  const columns = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Categoria", dataIndex: "category_name", key: "category_name" },
    { title: "Descrição", dataIndex: "description", key: "description" },
    {
      title: "Ações",
      key: "actions",
      render: (record: Technique) => (
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
    <Table<Technique>
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={loading}
    />
  );
};

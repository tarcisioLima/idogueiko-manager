import { useEffect, useState } from "react";
import { Button, message, Typography, Flex } from "antd";
import api from "~/api/api";
import { Technique } from "~/types";
import { TechniqueForm } from "~/components/TechniqueForm";
import { TechniqueTable } from "~/components/TechniqueTable";

const { Title } = Typography;

export default function TechniquePage() {
  const [data, setData] = useState<Technique[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Technique | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const res = await api.get("techniques/");
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await api.delete(`techniques/${id}/`);
    message.success("Golpe deletado!");
    fetchData();
  };

  const handleSubmit = async (values: Omit<Technique, "id">) => {
    if (editing) {
      await api.put(`techniques/${editing.id}/`, values);
      message.success("Golpe atualizado!");
    } else {
      await api.post("techniques/", values);
      message.success("Golpe criado!");
    }
    setModalOpen(false);
    setEditing(null);
    fetchData();
  };

  return (
    <div style={{ padding: 24 }}>
      <Flex align="center" justify="space-between">
        <Title>Golpes</Title>
        <Button type="primary" onClick={() => setModalOpen(true)} size="large">
          Novo golpe
        </Button>
      </Flex>

      <TechniqueTable
        data={data}
        onEdit={setEditing}
        onDelete={handleDelete}
        loading={loading}
      />

      <TechniqueForm
        open={modalOpen || !!editing}
        onCancel={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
        initialValues={editing || {}}
      />
    </div>
  );
}

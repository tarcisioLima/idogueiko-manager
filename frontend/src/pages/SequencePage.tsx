/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button, message, Typography, Flex } from "antd";
import api from "~/api/api";
import { Sequence, StanceAndQuantity } from "~/types";

import { SequenceForm } from "~/components/SequenceForm";
import { SequenceTable } from "~/components/SequenceTable";
import { SequenceDrawer } from "~/components/SequenceDrawer";

const { Title } = Typography;

export default function SequencePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [data, setData] = useState<Sequence[]>([]);
  const [currentSequence, setCurrentSequence] = useState<Sequence | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await api.get("sequences/");
    setData(res.data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    await api.delete(`sequences/${id}/`);
    message.success("Sequencia deletada!");
    fetchData();
  };

  const handleSubmit = async (values: StanceAndQuantity) => {
    try {
      await api.post("sequences/generate-random/", values);
      message.success("Categoria criada");
      setModalOpen(false);
      fetchData();
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Não foi possível gerar a sequência. Tente novamente.";

      messageApi.error(errorMessage);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      {contextHolder}

      <Flex align="center" justify="space-between">
        <Title>Sequências</Title>
        <Button type="primary" onClick={() => setModalOpen(true)} size="large">
          Gerar nova sequência
        </Button>
      </Flex>

      <SequenceTable
        data={data}
        onDelete={handleDelete}
        loading={loading}
        setCurrentSequence={setCurrentSequence}
        openDrawer={() => setDrawerOpen(true)}
      />

      <SequenceForm
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        onSubmit={handleSubmit}
      />

      <SequenceDrawer
        data={currentSequence}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      />
    </div>
  );
}

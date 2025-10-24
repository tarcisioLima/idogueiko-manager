import { useEffect, useState } from "react";
import { Button, message, Typography, Flex } from "antd";

import api from "~/api/api";
import { Category } from "~/types";
import { CategoryForm } from "~/components/CategoryForm";
import { CategoryTable } from "~/components/CategoryTable";
import { useCategories } from "~/context/CategoryContext";

const { Title } = Typography;

export default function CategoryPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const {
    categories,
    reloadCategories,
    loading: loadingCategory,
  } = useCategories();

  useEffect(() => {
    reloadCategories();
  }, []);

  const handleDelete = async (id: number) => {
    await api.delete(`categories/${id}/`);
    message.success("Categoria deletada!");
    reloadCategories();
  };

  const handleSubmit = async (values: Omit<Category, "id">) => {
    if (editing) {
      await api.put(`categories/${editing.id}/`, values);
      message.success("Categoria atualizada!");
    } else {
      await api.post("categories/", values);
      message.success("Categoria criada");
    }
    setModalOpen(false);
    setEditing(null);
    reloadCategories();
  };

  return (
    <div style={{ padding: 24 }}>
      <Flex align="center" justify="space-between">
        <Title>Categorias</Title>
        <Button type="primary" onClick={() => setModalOpen(true)} size="large">
          Nova categoria
        </Button>
      </Flex>

      <CategoryTable
        data={categories}
        onEdit={setEditing}
        onDelete={handleDelete}
        loading={loadingCategory}
      />

      <CategoryForm
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

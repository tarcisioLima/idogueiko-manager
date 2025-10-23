import { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { Technique } from "~/types";
import { useCategories } from "~/context/CategoryContext";

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: Omit<Technique, "id">) => void;
  initialValues?: Partial<Technique>;
}

export const TechniqueForm: React.FC<Props> = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const { categories } = useCategories();

  // 🔥 Forçar atualização do form quando o modal abre
  useEffect(() => {
    if (open) {
      if (initialValues && Object.keys(initialValues).length > 0) {
        form.setFieldsValue({
          ...initialValues,
          category: initialValues.category?.id ?? initialValues.category,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, form]);

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={initialValues?.id ? "Editar Golpe" : "Novo Golpe"}
      open={open}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      cancelText="Cancelar"
      okText={initialValues?.id ? "Atualizar" : "Enviar"}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="category"
          label="Categoria"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Selecione uma categoria"
            options={categories.map((cat) => ({
              label: cat.name,
              value: cat.id,
            }))}
          />
        </Form.Item>

        <Form.Item name="description" label="Descrição">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

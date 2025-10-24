import { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { Category } from "~/types";

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: Omit<Category, "id">) => void;
  initialValues?: Partial<Category>;
}

export const CategoryForm: React.FC<Props> = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (initialValues && Object.keys(initialValues).length > 0) {
        form.setFieldsValue({
          ...initialValues,
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
      title={initialValues?.id ? "Editar Categoria" : "Nova Categoria"}
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

        <Form.Item name="description" label="Descrição">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

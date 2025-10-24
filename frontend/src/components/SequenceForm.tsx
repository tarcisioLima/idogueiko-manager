import { useEffect } from "react";
import { Modal, Form, Select, InputNumber } from "antd";
import { StanceAndQuantity } from "~/types";

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: StanceAndQuantity) => void;
  initialValues?: Partial<StanceAndQuantity>;
}

export const SequenceForm: React.FC<Props> = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (initialValues && Object.keys(initialValues).length > 0) {
        form.setFieldsValue(initialValues);
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
      title="Gerar sequência"
      open={open}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      cancelText="Cancelar"
      okText={"Gerar"}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item name="stance" label="Posição" rules={[{ required: true }]}>
          <Select
            placeholder="Selecione a posição"
            options={["ZENKUTSU_DACHI", "KOKUTSU_DACHI", "KIBA_DACHI"].map(
              (stance) => ({
                label: stance,
                value: stance,
              })
            )}
          />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantidade"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} max={10} defaultValue={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

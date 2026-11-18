import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Input, Button, Card, Typography, message } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useAuth } from '../contexts/AuthContext'

export function LoginPage() {
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/admin'

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true)
    try {
      await signIn(values.email, values.password)
      message.success('Xoş gəldiniz!')
      navigate(from, { replace: true })
    } catch (e) {
      message.error((e as Error).message || 'Giriş uğursuz oldu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-ink-950 via-ink-900 to-ink-800 p-4">
      <Card className="w-full max-w-md shadow-2xl" bordered={false}>
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-xl bg-accent-500 text-2xl font-bold text-ink-950">
            A
          </div>
          <Typography.Title level={3} className="!mb-1">
            Abacus Admin
          </Typography.Title>
          <Typography.Text type="secondary">İdarəetmə panelinə daxil olun</Typography.Text>
        </div>
        <Form layout="vertical" onFinish={onFinish} size="large">
          <Form.Item
            name="email"
            rules={[{ required: true, type: 'email', message: 'E-poçt daxil edin' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="E-poçt" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Şifrə daxil edin' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Şifrə" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading} className="!bg-accent-500 !text-ink-950 hover:!bg-accent-400">
            Daxil ol
          </Button>
        </Form>
        <Typography.Paragraph type="secondary" className="!mt-6 !mb-0 text-center text-xs">
          Admin istifadəçisini Supabase Dashboard → Authentication → Users bölməsində yaradın.
        </Typography.Paragraph>
      </Card>
    </div>
  )
}

import {HomeOutlined, Feed} from '@mui/icons-material'

export const sidebarItems = [
  {
    title: 'Início',
    icon: <HomeOutlined />,
    path: '/app',
  },
  {
    title: 'Prescrever Receita',
    path: '/app/receita',
    icon: <Feed />
  }
]
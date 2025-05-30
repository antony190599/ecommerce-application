
export const categories = [
  {
    id: 'escritorio',
    name: 'Accesorios de Escritorio',
    path: '/accesorios-escritorio',
    subcategories: [
      { id: 'organizadores', name: 'Organizadores de Escritorio', path: '/accesorios-escritorio/organizadores' },
      { id: 'porta-lapices', name: 'Porta Lápices', path: '/accesorios-escritorio/porta-lapices' },
      { id: 'pisapapeles', name: 'Pisapapeles', path: '/accesorios-escritorio/pisapapeles' },
      { id: 'calendarios', name: 'Calendarios de Escritorio', path: '/accesorios-escritorio/calendarios' },
      { id: 'lamparas', name: 'Lámparas de Escritorio', path: '/accesorios-escritorio/lamparas' },
      { id: 'papeleras', name: 'Papeleras y Cestos', path: '/accesorios-escritorio/papeleras' }
    ]
  },
  {
    id: 'papeleria',
    name: 'Papelería',
    path: '/papeleria',
    subcategories: [
      { id: 'papel-impresion', name: 'Papel de Impresión', path: '/papeleria/papel-impresion' },
      { id: 'papel-especializado', name: 'Papel Especializado', path: '/papeleria/papel-especializado' },
      { id: 'sobres', name: 'Sobres', path: '/papeleria/sobres' },
      { id: 'notas-adhesivas', name: 'Notas Adhesivas', path: '/papeleria/notas-adhesivas' },
      { id: 'etiquetas', name: 'Etiquetas', path: '/papeleria/etiquetas' }
    ]
  },
  {
    id: 'escritura',
    name: 'Escritura y Caligrafía',
    path: '/escritura-caligrafia',
    subcategories: [
      { id: 'boligrafos', name: 'Bolígrafos', path: '/escritura-caligrafia/boligrafos' },
      { id: 'lapiceros', name: 'Lapiceros', path: '/escritura-caligrafia/lapiceros' },
      { id: 'plumon', name: 'Plumones', path: '/escritura-caligrafia/plumones' },
      { id: 'resaltadores', name: 'Resaltadores', path: '/escritura-caligrafia/resaltadores' },
      { id: 'marcadores', name: 'Marcadores', path: '/escritura-caligrafia/marcadores' },
      { id: 'lapices-colores', name: 'Lápices de Colores', path: '/escritura-caligrafia/lapices-colores' },
      { id: 'crayones', name: 'Crayones', path: '/escritura-caligrafia/crayones' }
    ]
  },
  {
    id: 'arte',
    name: 'Arte',
    path: '/arte',
    subcategories: [
      { id: 'pinceles', name: 'Pinceles', path: '/arte/pinceles' },
      { id: 'oleos', name: 'Óleos', path: '/arte/oleos' },
      { id: 'acuarelas', name: 'Acuarelas', path: '/arte/acuarelas' },
      { id: 'caballetes', name: 'Caballetes', path: '/arte/caballetes' },
      { id: 'lienzos', name: 'Lienzos', path: '/arte/lienzos' },
      { id: 'acrílicos', name: 'Acrílicos', path: '/arte/acrilicos' }
    ]
  },
  {
    id: 'archivo',
    name: 'Archivo y Organización',
    path: '/archivo-organizacion',
    subcategories: [
      { id: 'archivadores', name: 'Archivadores', path: '/archivo-organizacion/archivadores' },
      { id: 'carpetas', name: 'Carpetas', path: '/archivo-organizacion/carpetas' },
      { id: 'portafolios', name: 'Portafolios', path: '/archivo-organizacion/portafolios' },
      { id: 'separadores', name: 'Separadores', path: '/archivo-organizacion/separadores' },
      { id: 'cajas-archivo', name: 'Cajas de Archivo', path: '/archivo-organizacion/cajas-archivo' }
    ]
  },
  {
    id: 'cuadernos',
    name: 'Cuadernos y Blocks',
    path: '/cuadernos-blocks',
    subcategories: [
      { id: 'cuadernos-universitarios', name: 'Cuadernos Universitarios', path: '/cuadernos-blocks/cuadernos-universitarios' },
      { id: 'blocks', name: 'Blocks', path: '/cuadernos-blocks/blocks' },
      { id: 'libretas', name: 'Libretas', path: '/cuadernos-blocks/libretas' },
      { id: 'agendas', name: 'Agendas', path: '/cuadernos-blocks/agendas' },
      { id: 'planners', name: 'Planners', path: '/cuadernos-blocks/planners' }
    ]
  },
  {
    id: 'adhesivos',
    name: 'Cintas y Pegamentos',
    path: '/cintas-pegamentos',
    subcategories: [
      { id: 'cintas-adhesivas', name: 'Cintas Adhesivas', path: '/cintas-pegamentos/cintas-adhesivas' },
      { id: 'cintas-doble-faz', name: 'Cintas Doble Faz', path: '/cintas-pegamentos/cintas-doble-faz' },
      { id: 'pegamentos', name: 'Pegamentos', path: '/cintas-pegamentos/pegamentos' },
      { id: 'gomas', name: 'Gomas', path: '/cintas-pegamentos/gomas' },
      { id: 'barras-adhesivas', name: 'Barras Adhesivas', path: '/cintas-pegamentos/barras-adhesivas' }
    ]
  },
  {
    id: 'escolares',
    name: 'Materiales Didácticos',
    path: '/materiales-didacticos',
    subcategories: [
      { id: 'juegos-educativos', name: 'Juegos Educativos', path: '/materiales-didacticos/juegos-educativos' },
      { id: 'materiales-montessori', name: 'Materiales Montessori', path: '/materiales-didacticos/materiales-montessori' },
      { id: 'mapas', name: 'Mapas y Globos Terráqueos', path: '/materiales-didacticos/mapas' },
      { id: 'pizarras', name: 'Pizarras y Accesorios', path: '/materiales-didacticos/pizarras' },
      { id: 'tijeras-escolares', name: 'Tijeras Escolares', path: '/materiales-didacticos/tijeras-escolares' }
    ]
  }
];

export default categories;

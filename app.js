const {PrismaClient} = require ('@prisma/client')

const prisma = new PrismaClient()

async function main() {
//Crear un registro , arreglo con multiples datos
        /*const post = await prisma.post.createMany({
        data: [
          {title: 'titlulo 1', content: 'Primer envio de datos prisma'},
          {title: 'titlulo 2', content: 'Primer envio de datos 2 prisma'},
          {title: 'titlulo 3', content: 'Primer envio de datos 3 prisma'},         
        ]
        })    
      console.log(post)  */


// mostrar todos los registros 
        /*const allPost = await prisma.post.findMany()
          console.log (allPost) */


//Mostrar solo 1 datos 
      /*const post = await prisma.post.findUnique({
      where: {
      id:4
       }
        })
            console.log(post);
                  */

//actualizar un registro
    /*const updatepost = await prisma.post.update({
      where: {
        id: 4
      },
      data:{
            title: "titulo 4 -editado",
            content: "contenido editado"
      }
          })
         console.log(updatepost);
            */

// eliminar un registro 

      const deletePost = await prisma.post.delete({
        where:{
      id:5
    }
      })
        console.log(deletePost);
      }
          
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
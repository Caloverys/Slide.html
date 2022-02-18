    const images = {
          "Wikipedia icon": 'https://blogs.stthomas.edu/english/files/2016/04/Wikipedia-Logo.jpg',
          "Wikipedia on hands": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvyhm32s-UFL5RT94ozSkQdLrjWiVGd4sogw&usqp=CAU',
          "Black Wikipedia symbol": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKJMsaA28A32PrOKnj_PqUF1PezvB1bAygtQ&usqp=CAU",
          "Unknown Image": "https://image.shutterstock.com/image-vector/outline-more-vector-icon-illustration-260nw-1454351345.jpg"
        };
        const buttonarray = []
        othercontent = document.querySelector('.others');
        let img = document.querySelector('img')

        let i = 0
        k = 0
        clicktime = false;
        let current, timeout, interval, message, flip;
        const allbutton = document.getElementsByClassName('buttons')

        document.querySelector('.board:not(.allbutton)').addEventListener('click', function() {
          if (!clicktime) {
            img.classList.toggle("rotateback", false)
            img.classList.toggle("rotateIn", true)
            window.clearInterval(interval)
            setTimeout(() => {
              img.style.display = 'none'
              othercontent.innerHTML += `
       <div class='extra background'>Use <a href='${this.src}'>this link</a> to direct you to the image</div>
       <div class='extra backgroundtext'>Click again to go back to the slide
       `

            }, 1000)
            message = document.createElement("div")
            message.textContent = "Interval is stopped"
            message.className = 'message'
            document.body.appendChild(message)
            clicktime = true;
          } else {
            img = document.querySelector('img')
            img.classList.add("rotateback")
            img.classList.remove("rotateIn")
            img.style.display = 'revert'
            document.querySelectorAll(".extra").forEach(i => i.remove())
            message.remove();
            create("Interval restarted")
            clicktime = false
          }
        })


        img.onmouseenter = function() {
          if (flip) flip.remove()
          flip = document.createElement('div')
          flip.className = 'flip'
          flip.textContent = Object.keys(images)[i]
          document.querySelector('.capation').appendChild(flip)
          create("Interval stopped")
          window.clearInterval(interval)
        }
        img.onmouseleave = function() {
          if (!clicktime) {
            window.clearTimeout(timeout)
            interval = setInterval(start, 3000);
            flip.remove()
            create("Interval restart")
          }
        }

        for (let j = 0; j < Object.keys(images).length; j++) {
          buttonarray.push(`button${j}`)
          let buttons = document.createElement('button')
          buttons.className = 'buttons'
          buttons.id = buttonarray[j]
          buttons.addEventListener('click', clicked)
          document.querySelector('.allbutton').appendChild(buttons)
          if (j) buttons.classList.add('opacity')
        }
        create(`Display image #${parseInt(i)+1}`, 1100)
        interval = setInterval(start, 3000)

        function start() {
          i++;
          if (i === Object.keys(images).length) i = 0
          create(`Display image #${parseInt(i)+1}`, 1100)
          for (let y = 0; y < Object.keys(images).length; y++) {
            allbutton[y].classList.remove('opacity')
            if (y == i) {
              allbutton[y].classList.add('fadeout')
              allbutton[y].classList.remove('fadein')
            } else {
              allbutton[y].classList.add('fadein')
              allbutton[y].classList.remove('fadeout')
            }
          }
          img.src = Object.values(images)[i]
        }


        function clicked() {
          window.clearInterval(interval);
          //regular expression to replace non-digit character
          let id = this.id.replace(/\D/g, '')
          img.src = Object.values(images)[id]
          i = id
          create(`Display image #${parseInt(i)+1}`, 1100)
          for (let z = 0; z < Object.keys(images).length; z++) {
            allbutton[z].classList.remove('opacity')
            if (z == id) {
              allbutton[z].classList.add('fadeout')
              allbutton[z].classList.remove('fadein')
            } else {
              allbutton[z].classList.add('fadein')
              allbutton[z].classList.remove('fadeout')
            }
          }
          interval = setInterval(start, 3000)
        }

        function create(content, time = 750) {
          if (document.querySelectorAll('.message')) {
            document.querySelectorAll('.message').forEach(i => i.remove())
          }

          let mes = document.createElement("div")
          mes.textContent = content
          mes.className = 'message'
          document.body.appendChild(mes)
          setTimeout(function() {
            mes.remove()
          }, time)
        }

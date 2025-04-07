document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os elementos com data-bs-toggle="dropdown"
  document.querySelectorAll("[data-bs-toggle='dropdown']").forEach((toggle) => {
    const parent = toggle.parentElement; // Elemento pai (dropdown ou btn-group)
    const menu = parent.querySelector(".dropdown-menu");
    
    // Função para mostrar o dropdown
    const showDropdown = () => {
      // Verifica se a tela é maior que 992px
      const isDesktop = window.matchMedia("(min-width: 992px)").matches;
      
      if (isDesktop) {
        toggle.classList.add("show");
        toggle.setAttribute("aria-expanded", "true");
        menu.classList.add("show");
        menu.setAttribute("data-bs-popper", "static");
      }
    };
    
    // Função para ocultar o dropdown
    const hideDropdown = () => {
      // Verifica se a tela é maior que 992px
      const isDesktop = window.matchMedia("(min-width: 992px)").matches;
      
      if (isDesktop) {
        setTimeout(() => {
          if (!menu.matches(":hover") && !toggle.matches(":hover")) {
            toggle.classList.remove("show");
            toggle.setAttribute("aria-expanded", "false");
            menu.classList.remove("show");
            menu.removeAttribute("data-bs-popper");
          }
        }, 100); // Pequeno delay para permitir transição suave
      }
    };
    
    // Eventos para o elemento pai (dropdown ou btn-group)
    parent.addEventListener("mouseenter", showDropdown);
    parent.addEventListener("mouseleave", hideDropdown);
    
    // Eventos para o submenu (.dropdown-menu)
    menu.addEventListener("mouseenter", showDropdown);
    menu.addEventListener("mouseleave", hideDropdown);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os elementos com o atributo data-bg-image
  const elements = document.querySelectorAll("[data-bg-image]");
  
  // Itera sobre cada elemento encontrado
  elements.forEach((element) => {
    const bgImage = element.getAttribute("data-bg-image"); // Pega o valor do atributo
    if (bgImage) {
      element.style.backgroundImage = `url('${bgImage}')`; // Aplica como background-image
    }
  });
});



// CSS VAR
const cssVar = (name, value) => {
  if (name[0] != '-') name = '--' + name // --
  if (value) document.documentElement.style.setProperty(name, value)
    return getComputedStyle(document.documentElement).getPropertyValue(name);
};


/**
* Monitorar a altura de um elemento e atualizar uma variável CSS.
* @param {string} selector - O seletor do elemento a ser monitorado.
* @param {string} cssVariable - O nome da variável CSS a ser atualizada.
*/
function observeElementHeight(selector, cssVariable) {
  const element = document.querySelector(selector);
  
  if (!element) {
    console.error(`Elemento com seletor "${selector}" não encontrado.`);
    return;
  }
  
  /**
  * Atualiza a variável CSS com a altura do elemento.
  */
  function updateHeight() {
    const height = `${element.offsetHeight}px`;
    document.documentElement.style.setProperty(`--${cssVariable}`, height);
  }
  
  // Inicializa o ResizeObserver para monitorar mudanças no tamanho do elemento
  const resizeObserver = new ResizeObserver(() => {
    updateHeight();
  });
  
  // Começa a observar o elemento
  resizeObserver.observe(element);
  
  // Atualiza a altura inicial imediatamente
  updateHeight();
}

document.addEventListener('DOMContentLoaded', () => {
  // Monitora o header e atualiza a variável --header-height
  observeElementHeight('#header', 'header-height');
  
  // Você pode monitorar outros elementos também, por exemplo:
  // observeElementHeight('.sidebar', 'sidebar-height');
});




// Função para rolar a página de forma suave
const scrollToViewportHeight = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  });
};

const scrollByViewportHeight = () => {
  window.scrollBy({
    top: window.innerHeight,
    behavior: 'smooth'
  });
};

// Seleciona todos os elementos com href="#down" e id="scroll-down"
const downLinks = document.querySelectorAll('a[href="#down"]');
const scrollDownButtons = document.querySelectorAll('#scroll-down');

// Adiciona o evento de clique para os links com href="#down"
downLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Impede o comportamento padrão do link
    scrollToViewportHeight(); // Rola 1x a altura da viewport
  });
});

// Adiciona o evento de clique para os elementos com id="scroll-down"
scrollDownButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); // Impede o comportamento padrão do link
    scrollByViewportHeight(); // Rola a altura da viewport a partir da posição atual
  });
});


// Scroll to Top (#)
document.addEventListener('DOMContentLoaded', function (event) {
  // Seleciona todos os links com href="#"
  const links = document.querySelectorAll('a[href="#"]');
  
  // Adiciona um evento de clique a cada link
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      // Previne o comportamento padrão do link
      event.preventDefault();
      
      // Rola a página para o topo com suavidade
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Remove o # da URL
      if (window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    });
  });
});


// Scroll Body Classes
document.addEventListener('DOMContentLoaded', () => {
  let lastScrollY = window.scrollY;
  
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const htmlElement = document.documentElement;
    
    // Verifica se está no topo da página
    if (currentScrollY === 0) {
      htmlElement.classList.add('on-top');
      htmlElement.classList.remove('top-offset');
    } else {
      htmlElement.classList.remove('on-top');
      htmlElement.classList.add('top-offset');
    }
    
    // Verifica a direção do scroll (para cima ou para baixo)
    if (currentScrollY > lastScrollY) {
      // Scroll para baixo
      htmlElement.classList.add('scroll-down');
      htmlElement.classList.remove('scroll-up');
    } else if (currentScrollY < lastScrollY) {
      // Scroll para cima
      htmlElement.classList.add('scroll-up');
      htmlElement.classList.remove('scroll-down');
    }
    
    // Verifica se o scroll ultrapassou a altura do header
    const headerHeight = parseInt(cssVar('--header-height'), 10);
    if (currentScrollY > headerHeight) {
      htmlElement.classList.add('header-offset');
    } else {
      htmlElement.classList.remove('header-offset');
    }
    
    lastScrollY = currentScrollY;
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Executa uma vez no carregamento para verificar o estado inicial
  handleScroll();
});


// Mouse Glow
document.addEventListener('DOMContentLoaded', () => {
  const elementsWithGlow = document.querySelectorAll('.mouse-glow');
  
  elementsWithGlow.forEach((element) => {
    // Cria o elemento de brilho
    const glowEffect = document.createElement('div');
    glowEffect.classList.add('glow-effect');
    element.appendChild(glowEffect);
    
    // Ativa o brilho ao mover o mouse
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      
      glowEffect.style.setProperty('--glow-x', `${offsetX}px`);
      glowEffect.style.setProperty('--glow-y', `${offsetY}px`);
      glowEffect.style.opacity = '0.5'; // Ativa o brilho
    });
  });
});


// Replace Vars [data-var]
document.addEventListener("DOMContentLoaded", () => {
  // Função principal para substituir valores de data-var
  function replaceDataVar(varName = null, value = null) {
    // Seleciona todos os elementos com o atributo data-var
    const elements = document.querySelectorAll("[data-var]");
    
    // Itera sobre cada elemento
    elements.forEach((element) => {
      const elementVarName = element.getAttribute("data-var"); // Obtém o nome da variável do elemento
      
      // Verifica se deve substituir com base nos parâmetros ou automaticamente
      if (varName && value && elementVarName === varName) {
        // Substitui apenas se o nome da variável corresponder ao parâmetro
        element.textContent = value;
      } else if (!varName && !value) {
        // Modo automático: substitui com base no nome da variável
        let calculatedValue = "";
        switch (elementVarName) {
          case "year":
          calculatedValue = new Date().getFullYear(); // Ano atual
          break;
          case "month":
          const months = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
          ];
          calculatedValue = months[new Date().getMonth()]; // Mês atual
          break;
          case "day":
          calculatedValue = new Date().getDate(); // Dia atual
          break;
          default:
          calculatedValue = `[${elementVarName}]`; // Valor padrão se a variável não for reconhecida
        }
        element.textContent = calculatedValue;
      }
    });
  }
  
  // Chama a função automaticamente ao carregar a página
  replaceDataVar();
  
  // Exporta a função para uso global (opcional)
  window.replaceDataVar = replaceDataVar;
});


// [fone]
document.addEventListener("DOMContentLoaded", () => {
  // Função para processar telefones em um nó de texto específico
  function processarTexto(node) {
    const texto = node.textContent;
    
    // Verificar se o texto contém o padrão [fone: número]
    if (/\[fone:\s*[\d\s\-\(\)]+\]/.test(texto)) {
      // Criar um elemento temporário para manipular o HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = texto.replace(/\[fone:\s*([\d\s\-\(\)]+)\]/g, (_, numero) => {
        const numeroLimpo = numero.replace(/[^0-9+]/g, ""); // Limpar caracteres não numéricos
        return `<a href="tel:${numeroLimpo}" aria-label="Telefone">${numero}</a>`;
      });
      
      // Substituir o conteúdo do nó original pelo novo conteúdo processado
      while (tempDiv.firstChild) {
        node.parentNode.insertBefore(tempDiv.firstChild, node);
      }
      node.parentNode.removeChild(node); // Remover o nó de texto original
    }
  }
  
  // Função principal para percorrer o DOM e processar telefones
  function processarTelefones() {
    // Array para armazenar todos os nós de texto relevantes
    const nosDeTexto = [];
    
    // Usar TreeWalker para coletar todos os nós de texto que contenham [fone: número]
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        // Aceitar apenas nós de texto que contenham [fone: número]
        return /\[fone:\s*[\d\s\-\(\)]+\]/.test(node.textContent)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
      },
    });
    
    // Coletar todos os nós de texto relevantes
    let node;
    while ((node = walker.nextNode())) {
      nosDeTexto.push(node);
    }
    
    // Processar cada nó de texto coletado
    nosDeTexto.forEach((node) => {
      processarTexto(node);
    });
  }
  
  // Chamar a função para processar os telefones
  processarTelefones();
});

// Fone Brasil
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.fone-br').forEach((input) => {
    input.addEventListener('keyup', (e) => {
      let value = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
      
      if (value.length > 11) {
        value = value.slice(0, 11); // Limita a quantidade máxima de caracteres
      }
      
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Adiciona parênteses nos dois primeiros dígitos
      
      if (value.length > 6) {
        value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2'); // Adiciona hífen antes dos últimos 4 dígitos
      }
      
      e.target.value = value;
    });
    
    input.addEventListener('blur', (e) => {
      const value = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
      
      if (value.length < 10) {
        e.target.value = ''; // Limpa o campo se houver menos de 10 dígitos
      }
    });
  });
});
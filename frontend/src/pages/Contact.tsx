import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Mail, MapPin, Phone, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <PageHeader
            title="Contato"
            description="Entre em contato conosco para mais informações sobre o projeto."
          />

          <div className="grid gap-8 mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium">Email</h3>
                      <p className="text-gray-600">
                        <a href="mailto:coplatedb@gmail.com" className="hover:text-blue-600">
                          coplatedb@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Home className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium">Instituição</h3>
                      <p className="text-gray-600">
                        IFSP - Instituto Federal de Educação Ciência e Tecnologia de São Paulo, Câmpus Birigui
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium">Endereço</h3>
                      <p className="text-gray-600">
                        Rua Pedro Cavalo, Nº 709
                        <br />
                        Residencial Portal da Pérola II
                        <br />
                        Birigui-SP
                        <br />
                        CEP: 16201-407
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium">Telefone</h3>
                      <p className="text-gray-600">
                        <a href="tel:+551836431160" className="hover:text-blue-600">
                          (18) 3643-1160
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>            {/* Mapa do Google */}
            <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d467.6056671303055!2d-50.33004024659771!3d-21.268770106706235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2sRua%20Pedro%20Cavalo%2C%20709%20-%20Portal%20da%20P%C3%A9rola%20II%2C%20Birigui%20-%20SP%2C%2016201-407!5e0!3m2!1spt-BR!2sbr!4v1710352789123!5m2!1spt-BR!2sbr&markers=color:red%7Clabel:IFSP%7C-21.268770,-50.330040"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>          {/* Call to Action */}
          <div className="w-screen mt-20 relative left-[50%] right-[50%] mx-[-50vw]">
            <section className="py-20 bg-blue-900 text-white" style={{ backgroundColor: '#1e3a8a' }}>
              <div className="container mx-auto px-4 max-w-4xl text-center">
                <h2 className="text-3xl font-bold mb-6">
                  Pronto para colaborar?
                </h2>
                <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                  Junte-se à nossa comunidade de pesquisadores e contribua para o avanço da visão 
                  computacional e reconhecimento de caracteres.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-blue-500 text-white hover:bg-blue-600 transition-all"
                    asChild
                  >
                    <Link to="/register">Criar Conta</Link>
                  </Button>
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-400 transition-all"
                    asChild
                  >
                    <Link to="/login">Entrar na plataforma</Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
